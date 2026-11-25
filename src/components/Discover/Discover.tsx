import { useEffect, useRef, useState } from "react";
import type React from "react";
import { Link } from "react-router";
import { useRecipes } from "../../contexts/RecipesContext";
import "./Discover.css";

function Discover() {
	const { recipes, favorites, toggleFavorite, loading, error } = useRecipes();

	const [seenRecipes, setSeenRecipes] = useState<string[]>([]);
	const [currentRecipeId, setCurrentRecipeId] = useState<string | null>(null);
	const [dragX, setDragX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [exitDirection, setExitDirection] = useState<-1 | 1 | null>(null);
	const [showSwipeHint, setShowSwipeHint] = useState(true);
	const [announcement, setAnnouncement] = useState(
		"Utilisez les flèches gauche et droite, les boutons ou le glissement pour découvrir les recettes.",
	);

	const startX = useRef<number | null>(null);

	function advanceRecipe(addToFavorites: boolean) {
		if (!currentRecipeId) {
			return;
		}

		const currentRecipe = recipes.find(
			(recipe) => recipe.idMeal === currentRecipeId,
		);

		if (!currentRecipe) {
			return;
		}

		if (addToFavorites) {
			toggleFavorite(currentRecipeId);
		}

		const excludedFavorites = addToFavorites
			? [...favorites, currentRecipeId]
			: favorites;

		let recipesToChooseFrom = recipes.filter(
			(recipe) =>
				!excludedFavorites.includes(recipe.idMeal) &&
				!seenRecipes.includes(recipe.idMeal),
		);

		let isNewCycle = false;

		if (recipesToChooseFrom.length === 0) {
			recipesToChooseFrom = recipes.filter(
				(recipe) =>
					!excludedFavorites.includes(recipe.idMeal) &&
					recipe.idMeal !== currentRecipeId,
			);

			isNewCycle = true;
		}

		if (recipesToChooseFrom.length === 0 && !addToFavorites) {
			recipesToChooseFrom = recipes.filter(
				(recipe) => !excludedFavorites.includes(recipe.idMeal),
			);

			isNewCycle = true;
		}

		if (recipesToChooseFrom.length === 0) {
			setCurrentRecipeId(null);
			setAnnouncement(
				addToFavorites
					? `${currentRecipe.strMeal} a été ajoutée aux favoris. Il n'y a plus de recette à découvrir.`
					: "Il n'y a plus de recette à découvrir pour le moment.",
			);
			return;
		}

		const randomIndex = Math.floor(Math.random() * recipesToChooseFrom.length);
		const selectedRecipe = recipesToChooseFrom[randomIndex];

		setCurrentRecipeId(selectedRecipe.idMeal);

		if (isNewCycle) {
			setSeenRecipes([selectedRecipe.idMeal]);
		} else {
			setSeenRecipes((previous) => [...previous, selectedRecipe.idMeal]);
		}

		setAnnouncement(
			addToFavorites
				? `${currentRecipe.strMeal} a été ajoutée aux favoris. Prochaine recette : ${selectedRecipe.strMeal}.`
				: `${currentRecipe.strMeal} passée. Prochaine recette : ${selectedRecipe.strMeal}.`,
		);
	}

	function handleChoice(addToFavorites: boolean) {
		setShowSwipeHint(false);
		advanceRecipe(addToFavorites);
	}

	function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
		if ((event.target as HTMLElement).closest("a, button")) {
			return;
		}

		setShowSwipeHint(false);

		startX.current = event.clientX;
		setIsDragging(true);
		event.currentTarget.setPointerCapture(event.pointerId);
	}

	function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
		if (startX.current === null) {
			return;
		}

		setDragX(event.clientX - startX.current);
	}

	function handlePointerUp(event: React.PointerEvent<HTMLElement>) {
		if (startX.current === null) {
			return;
		}

		const difference = event.clientX - startX.current;

		startX.current = null;
		setIsDragging(false);

		if (difference > 80) {
			setExitDirection(1);

			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			window.setTimeout(
				() => {
					advanceRecipe(true);
					setDragX(0);
					setExitDirection(null);
				},
				prefersReducedMotion ? 0 : 250,
			);
		} else if (difference < -80) {
			setExitDirection(-1);

			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			window.setTimeout(
				() => {
					advanceRecipe(false);
					setDragX(0);
					setExitDirection(null);
				},
				prefersReducedMotion ? 0 : 250,
			);
		} else {
			setDragX(0);
		}
	}

	function handlePointerCancel() {
		startX.current = null;
		setIsDragging(false);
		setDragX(0);
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
		if ((event.target as HTMLElement).closest("a, button") || event.repeat) {
			return;
		}

		if (event.key === "ArrowRight") {
			event.preventDefault();
			handleChoice(true);
		}

		if (event.key === "ArrowLeft") {
			event.preventDefault();
			handleChoice(false);
		}
	}

	useEffect(() => {
		if (loading || recipes.length === 0 || currentRecipeId !== null) {
			return;
		}

		const initialRecipes = recipes.filter(
			(recipe) => !favorites.includes(recipe.idMeal),
		);

		if (initialRecipes.length === 0) {
			setAnnouncement(
				"Toutes les recettes sont dans vos favoris. Il n'y a rien à découvrir pour le moment.",
			);
			return;
		}

		const randomIndex = Math.floor(Math.random() * initialRecipes.length);
		const selectedRecipe = initialRecipes[randomIndex];

		setCurrentRecipeId(selectedRecipe.idMeal);
		setSeenRecipes([selectedRecipe.idMeal]);
		setAnnouncement(`Première recette : ${selectedRecipe.strMeal}.`);
	}, [loading, recipes, favorites, currentRecipeId]);

	const currentRecipe = recipes.find(
		(recipe) => recipe.idMeal === currentRecipeId,
	);

	const rotation = Math.max(-15, Math.min(15, dragX / 20));

	const cardTransform =
		exitDirection !== null
			? `translateX(${exitDirection * 120}vw) rotate(${exitDirection * 20}deg)`
			: `translateX(${dragX}px) rotate(${rotation}deg)`;

	const indicatorOpacity = Math.min(Math.abs(dragX) / 80, 1);

	if (loading) {
		return <main className="discover">Loading recipes...</main>;
	}

	if (error) {
		return <main className="discover">{error}</main>;
	}

	return (
		<main className="discover">
			<h1 className="discover-heading">Discover</h1>

			<p className="visually-hidden" aria-live="polite" aria-atomic="true">
				{announcement}
			</p>

			{currentRecipe ? (
				<div className="discover-stage">
					{showSwipeHint && (
						<div className="discover-swipe-demo" aria-hidden="true">
							<i className="bi bi-arrow-right discover-swipe-arrow-right" />
							<i className="bi bi-arrow-left discover-swipe-arrow-left" />
							<i className="bi bi-heart-fill discover-swipe-heart" />
							<i className="bi bi-x-lg discover-swipe-cross" />
						</div>
					)}

					<article
						className={`card discover-card ${
							isDragging ? "is-dragging" : ""
						} ${showSwipeHint ? "show-swipe-demo" : ""}`}
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						onPointerCancel={handlePointerCancel}
						onKeyDown={handleKeyDown}
						tabIndex={0}
						aria-labelledby="discover-recipe-title"
						aria-describedby="discover-keyboard-help"
						style={{
							transform: cardTransform,
							transition: isDragging
								? "none"
								: "transform 0.25s ease, opacity 0.25s ease",
							opacity: exitDirection !== null ? 0 : 1,
						}}
					>
						<div
							className="discover-indicator discover-like"
							style={{
								opacity: dragX > 0 ? indicatorOpacity : 0,
							}}
							aria-hidden="true"
						>
							❤️ J'AIME
						</div>

						<div
							className="discover-indicator discover-nope"
							style={{
								opacity: dragX < 0 ? indicatorOpacity : 0,
							}}
							aria-hidden="true"
						>
							❌ PASSER
						</div>

						<img
							src={currentRecipe.strMealThumb}
							className="discover-card-image"
							alt={`Photographie du plat ${currentRecipe.strMeal}`}
							draggable={false}
						/>

						<div className="discover-card-content">
							<h2 id="discover-recipe-title">{currentRecipe.strMeal}</h2>

							<Link
								to={`/recipe/${currentRecipe.idMeal}`}
								className="btn btn-primary"
							>
								Recipe 🔪
							</Link>
						</div>
					</article>

					<p id="discover-keyboard-help" className="visually-hidden">
						On the card, press the right arrow to add this recipe to your
						favorites, or the left arrow to skip to the next one.
					</p>

					<div className="discover-actions">
						<button
							type="button"
							onClick={() => handleChoice(false)}
							aria-label="Passer cette recette"
							title="Passer"
						>
							<i className="bi bi-x-lg" aria-hidden="true" />
						</button>

						<button
							type="button"
							onClick={() => handleChoice(true)}
							aria-label="Ajouter cette recette aux favoris"
							title="Ajouter aux favoris"
						>
							<i className="bi bi-heart-fill" aria-hidden="true" />
						</button>
					</div>
				</div>
			) : (
				<p className="discover-empty-message">
					No recipes available to discover.
				</p>
			)}

			<Link to="/all-recipes" className="featured-all-button">
				All recipes
			</Link>
		</main>
	);
}

export default Discover;
