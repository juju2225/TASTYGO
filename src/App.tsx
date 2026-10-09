import { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import countries from "./data/countries";
import getAllRecipes from "./services/recipeService";
import type { Recipe } from "./types/types";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import NavBar from "./components/NavBar/NavBar";

function App() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	useEffect(() => {
		getAllRecipes().then((data) => {
			setRecipes(data);
		});
	}, []);

	const [search, setSearch] = useState("");
	const way = useNavigate();
	function inputValue(valInput: string) {
		setSearch(valInput);
		way("/all-recipes");
	}

	return (
		<>
			<header>
				<NavBar recipeUser={inputValue} />
			</header>
			<Routes>
				<Route
					path="/all-recipes"
					element={
						<div className="recipe-grid">
							{recipes
								.filter((recipe) => {
									return (
										recipe.strMeal
											.toLowerCase()
											.includes(search.toLowerCase()) ||
										recipe.strCountry
											.toLowerCase()
											.includes(search.toLowerCase())
									);
								})
								.map((recipe) => {
									const flags = countries.find((country) => {
										return country.country === recipe.strCountry;
									});
									return (
										<RecipeCard
											key={recipe.idMeal}
											recipe={recipe}
											flag={flags}
										/>
									);
								})}
						</div>
					}
				/>
				<Route path="/home" element={<h1>Hello from home</h1>} />
				<Route path="/discover" element={<h1>Hello from discover</h1>} />
				<Route path="/favorites" element={<h1>hello from favorites</h1>} />
				<Route path="/my-list" element={<h1>hello from my-list</h1>} />
			</Routes>
		</>
	);
}

export default App;
