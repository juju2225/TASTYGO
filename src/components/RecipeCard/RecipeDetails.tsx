import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getRecipeId } from "../../services/recipeService";
import type { Recipe } from "../../types/types";
import countries from "../../data/countries";
import "./RecipeDetails.css";

type RecipeItemKey = `strIngredient${number}` | `strMeasure${number}`;

type ValidRecipeItemKey = Extract<RecipeItemKey, keyof Recipe>;

function RecipeDetails() {
	const { idMeal } = useParams();
	const [idRecipe, setIdRecipe] = useState<Recipe | null>(null);
	const [servings, setServings] = useState(4);

	useEffect(() => {
		if (idMeal) {
			getRecipeId(idMeal).then((data) => {
				setIdRecipe(data[0]);
			});
		}
	}, [idMeal]);

	const flagDetail = countries.find(
		(country) => country.country === idRecipe?.strCountry,
	);

	type Ingredient = {
		ingredient: string;
		measure: string;
	};

	const ingredients: Ingredient[] = [];
	for (let i = 1; i <= 20; i++) {
		if (
			idRecipe?.[`strIngredient${i}` as ValidRecipeItemKey] &&
			idRecipe?.[`strMeasure${i}` as ValidRecipeItemKey]
		) {
			ingredients.push({
				ingredient: idRecipe[`strIngredient${i}` as ValidRecipeItemKey],
				measure: idRecipe[`strMeasure${i}` as ValidRecipeItemKey],
			});
		}
	}

	return (
		<main>
			<div className="top-details">
				<div className="country-details">
					<span aria-hidden="true">{flagDetail?.flag}</span>
					{flagDetail?.country && <p>{flagDetail.country}</p>}
				</div>

				<button
					type="button"
					aria-label={`Add ${idRecipe?.strMeal ?? "recipe"} to favorites`}
					className="favorite-button"
				>
					<i className="bi bi-heart" aria-hidden="true"></i>
					Favorite
				</button>

				<button type="button" onClick={() => window.print()}>
					<i className="bi bi-printer" aria-hidden="true"></i>
					Print
				</button>
			</div>

			<section className="meal-details">
				<div>
					<h1>{idRecipe?.strMeal ?? "Loading..."}</h1>

					<h2>{`Ingredients for ${servings} people`}</h2>

					<div className="servings-buttons">
						<button
							type="button"
							className="btn btn-outline-secondary"
							aria-label="Decrease servings"
							disabled={servings <= 1}
							onClick={() => setServings((current) => current - 1)}
						>
							<i className="bi bi-dash-lg" aria-hidden="true"></i>
						</button>

						<button
							type="button"
							className="btn btn-outline-secondary"
							aria-label="Increase servings"
							onClick={() => setServings((current) => current + 1)}
						>
							<i className="bi bi-plus-lg" aria-hidden="true"></i>
						</button>
					</div>

					<ul className="ingredients-list">
						{ingredients.map((ingredient) => {
							let quantity: number | string =
								(parseFloat(ingredient.measure) / 4) * servings;
							let unit: string = ingredient.measure.match(/\D+$/)?.[0] ?? "";

							if (Number.isNaN(quantity)) {
								quantity = ingredient.measure;
								unit = "";
							}

							return (
								<li key={ingredient.ingredient}>
									{`${ingredient.ingredient} : ${quantity}${unit}`}
								</li>
							);
						})}
					</ul>
				</div>

				<img
					src={idRecipe?.strMealThumb}
					alt={idRecipe?.strMeal ? `Prepared ${idRecipe.strMeal}` : ""}
				/>
			</section>

			<section className="recipe-instructions">
				<h2>Preparation</h2>
				<p>{idRecipe?.strInstructions}</p>
			</section>

			<Link to="/all-recipes" className="btn btn-primary">
				All recipes
			</Link>
		</main>
	);
}

export default RecipeDetails;
