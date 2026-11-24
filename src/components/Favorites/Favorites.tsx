import { Link } from "react-router";
import { useRecipes } from "../../contexts/RecipesContext";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./Favorites.css";

function Favorites() {
	const { recipes, favorites, loading } = useRecipes();

	const favoriteRecipes = recipes.filter((recipe) =>
		favorites.includes(recipe.idMeal),
	);

	if (loading) {
		return <p>Loading favorites...</p>;
	}

	return (
		<main className="favorites">
			<h1 className="favorites-heading">My Favorites</h1>

			{favoriteRecipes.length > 0 ? (
				<div className="favorites-grid">
					{favoriteRecipes.map((recipe) => (
						<RecipeCard key={recipe.idMeal} recipe={recipe} />
					))}
				</div>
			) : (
				<p className="favorites-message">
					You haven't added any recipes to your favorites yet.
				</p>
			)}

			<Link to="/all-recipes" className="featured-all-button">
				All recipes
			</Link>
		</main>
	);
}

export default Favorites;
