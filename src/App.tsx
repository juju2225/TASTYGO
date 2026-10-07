import "./App.css";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import getAllRecipes from "./services/recipeService";
import { useEffect, useState } from "react";
import countries from "./data/countries";
import type { Recipe } from "./types/types";

function App() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	useEffect(() => {
		getAllRecipes().then((data) => {
			setRecipes(data);
		});
	}, []);

	return (
		<main>
			<div className="recipe-grid">
				{recipes.map((recipe) => {
					const flags = countries.find((country) => {
						return country.country === recipe.strCountry;
					});
					return (
						<RecipeCard key={recipe.idMeal} recipe={recipe} flag={flags} />
					);
				})}
			</div>
		</main>
	);
}

export default App;
