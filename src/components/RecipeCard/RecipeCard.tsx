import type { RecipeCards } from "../../types/types";
import "./RecipeCard.css";

function RecipeCard({ recipe, flag }: RecipeCards) {
	console.log(recipe);
	return (
		<article className="card recipe-card">
			<img
				src={recipe.strMealThumb}
				className="card-img-top"
				alt={recipe.strMeal}
			/>
			<div className="card-body">
				<p className="card-text">{flag?.flag}</p>
				<p className="card-text-2">{flag?.country}</p>
				<h5 className="card-title">{recipe.strMeal}</h5>
				<button type="button" className="btn btn-primary">
					Recette 🔪
				</button>
				<button
					type="button"
					className="favorite-button"
					aria-label={`Ajoutez ${recipe.strMeal} au favoris`}
				>
					<i className="bi bi-heart" aria-hidden="true"></i>
				</button>
			</div>
		</article>
	);
}

export default RecipeCard;
