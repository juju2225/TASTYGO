import { Link } from "react-router";
import type { RecipeCards } from "../../types/types";
import { useRecipes } from "../../contexts/RecipesContext";
import "./RecipeCard.css";

function RecipeCard({ recipe, flag }: RecipeCards) {
	const { toggleFavorite, isFavorite } = useRecipes();

	const favorite = isFavorite(recipe.idMeal);

	return (
		<article className="card recipe-card">
			<img
				src={recipe.strMealThumb}
				className="card-img-top"
				alt={recipe.strMeal}
			/>
			<div className="card-body">
				<h5 className="card-title">{recipe.strMeal}</h5>
				<Link to={`/recipe/${recipe.idMeal}`} className="btn btn-primary">
					Recipe 🔪
				</Link>
				<button
					type="button"
					className="favorite-button"
					aria-label={
						favorite
							? `Retirer ${recipe.strMeal} des favoris`
							: `Ajouter ${recipe.strMeal} aux favoris`
					}
					aria-pressed={favorite}
					onClick={() => toggleFavorite(recipe.idMeal)}
				>
					<i
						className={`bi ${favorite ? "bi-heart-fill" : "bi-heart"}`}
						aria-hidden="true"
					/>
				</button>
			</div>
		</article>
	);
}

export default RecipeCard;
