import { Link } from "react-router";
import type { Recipe } from "../../../types/types";
import RecipeCard from "../../RecipeCard/RecipeCard";
import countries from "../../../data/countries";
import "./FeaturedRecipes.css";

interface FeaturedRecipesProps {
	recipes: Recipe[];
}

function FeaturedRecipes({ recipes }: FeaturedRecipesProps) {
	return (
		<section className="featured-recipes">
			<h2 className="featured-heading">Featured recipes</h2>

			<div className="featured-grid">
				{recipes.map((recipe) => {
					const flag = countries.find(
						(country) => country.country === recipe.strCountry,
					);

					return <RecipeCard key={recipe.idMeal} recipe={recipe} flag={flag} />;
				})}
			</div>
		</section>
	);
}

export default FeaturedRecipes;
