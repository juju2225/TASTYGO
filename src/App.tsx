import { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import countries from "./data/countries";
import type { Recipe } from "./types/types";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import RecipeDetails from "./components/RecipeCard/RecipeDetails";
import RecipeFilter from "./components/RecipeFilter/RecipeFilter";
import desserts from "./data/desserts";
import allergens from "./data/allergens";
import Home from "./components/Home/Home";
import { useRecipes } from "./contexts/RecipesContext";

function App() {
	const { recipes, loading, error } = useRecipes();

	const [search, setSearch] = useState("");
	const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
	const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
	const [selectedDesserts, setSelectedDesserts] = useState<string[]>([]);
	const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

	const way = useNavigate();

	function inputValue(valInput: string) {
		setSearch(valInput);
		way("/all-recipes");
	}

	function checkboxValue(valBox: string) {
		if (selectedCountry.includes(valBox)) {
			setSelectedCountry(
				selectedCountry.filter((country) => country !== valBox),
			);
		} else {
			setSelectedCountry([...selectedCountry, valBox]);
		}

		way("/all-recipes");
	}

	function resetCountries() {
		setSelectedCountry([]);
	}

	function checkboxDishes(valDish: string) {
		if (selectedDishes.includes(valDish)) {
			setSelectedDishes(selectedDishes.filter((dish) => dish !== valDish));
		} else {
			setSelectedDishes([...selectedDishes, valDish]);
		}

		way("/all-recipes");
	}

	function resetDishes() {
		setSelectedDishes([]);
	}

	function checkboxDesserts(valDessert: string) {
		if (selectedDesserts.includes(valDessert)) {
			setSelectedDesserts(
				selectedDesserts.filter((dessert) => dessert !== valDessert),
			);
		} else {
			setSelectedDesserts([...selectedDesserts, valDessert]);
		}

		way("/all-recipes");
	}

	function resetDesserts() {
		setSelectedDesserts([]);
	}

	function checkBoxAllergens(valAllergen: string) {
		if (selectedAllergens.includes(valAllergen)) {
			setSelectedAllergens(
				selectedAllergens.filter((allergen) => allergen !== valAllergen),
			);
		} else {
			setSelectedAllergens([...selectedAllergens, valAllergen]);
		}

		way("/all-recipes");
	}

	function resetAllergens() {
		setSelectedAllergens([]);
	}

	function getIngredients(recipe: Recipe): string[] {
		return Array.from({ length: 20 }, (_, index) => {
			const key = `strIngredient${index + 1}` as keyof Recipe;

			return String(recipe[key] ?? "")
				.toLowerCase()
				.trim();
		});
	}

	const activeAllergens = allergens.filter((allergen) =>
		selectedAllergens.includes(allergen.name),
	);

	const filteredRecipes = recipes.filter((recipe) => {
		const matchesSearch =
			recipe.strMeal.toLowerCase().includes(search.toLowerCase()) ||
			recipe.strCountry.toLowerCase().includes(search.toLowerCase());

		const matchesCountry =
			selectedCountry.length === 0 ||
			selectedCountry.includes(recipe.strCountry);

		const matchesDishes =
			selectedDishes.length === 0 ||
			selectedDishes.includes(recipe.strCategory);

		const ingredients = getIngredients(recipe);

		let matchesDesserts = true;

		if (selectedDesserts.length > 0) {
			matchesDesserts =
				recipe.strCategory === "Dessert" &&
				desserts.some((dessert) => {
					return (
						selectedDesserts.includes(dessert.name) &&
						ingredients.some((ingredient) =>
							dessert.ingredients.some((keyword) =>
								ingredient.includes(keyword.toLowerCase()),
							),
						)
					);
				});
		}

		const matchesAllergens = activeAllergens.every(
			(allergen) =>
				!ingredients.some((ingredient) =>
					allergen.ingredients.some((keyword) =>
						ingredient.includes(keyword.toLowerCase()),
					),
				),
		);

		return (
			matchesSearch &&
			matchesCountry &&
			matchesDishes &&
			matchesDesserts &&
			matchesAllergens
		);
	});

	return (
		<>
			<header>
				<NavBar recipeUser={inputValue} />
			</header>

			<Routes>
				<Route path="/" element={<Navigate to="/home" replace />} />

				<Route path="/home" element={<Home />} />

				<Route
					path="/all-recipes"
					element={
						<>
							<h1 className="all-recipes-title">All recipes</h1>

							<RecipeFilter
								checkBoxFilter={checkboxValue}
								selectedCountry={selectedCountry}
								resetCountries={resetCountries}
								checkBoxDishes={checkboxDishes}
								selectedDishes={selectedDishes}
								resetDishes={resetDishes}
								checkBoxDesserts={checkboxDesserts}
								selectedDesserts={selectedDesserts}
								resetDesserts={resetDesserts}
								checkBoxAllergens={checkBoxAllergens}
								selectedAllergens={selectedAllergens}
								resetAllergens={resetAllergens}
							/>

							{loading ? (
								<p className="no-recipes">Loading recipes...</p>
							) : error ? (
								<p className="no-recipes">{error}</p>
							) : filteredRecipes.length === 0 ? (
								<p className="no-recipes">No recipes available</p>
							) : (
								<div className="recipe-grid">
									{filteredRecipes.map((recipe) => {
										const flags = countries.find(
											(country) => country.country === recipe.strCountry,
										);

										return (
											<RecipeCard
												key={recipe.idMeal}
												recipe={recipe}
												flag={flags}
											/>
										);
									})}
								</div>
							)}
						</>
					}
				/>

				<Route path="/discover" element={<h1>Hello from discover</h1>} />

				<Route path="/favorites" element={<h1>hello from favorites</h1>} />

				<Route path="/my-list" element={<h1>hello from my-list</h1>} />

				<Route path="/recipe/:idMeal" element={<RecipeDetails />} />
			</Routes>
		</>
	);
}

export default App;
