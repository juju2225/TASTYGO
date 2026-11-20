import { useEffect, useState } from "react";
import countries from "../../data/countries";
import "./RecipeFilter.css";
import type { checkBoxFilterProps } from "../../types/types";
import dishes from "../../data/dishes";
import desserts from "../../data/desserts";
import allergens from "../../data/allergens";

type Filter = "Countries" | "Dishes" | "Desserts" | "Allergens" | "";

function RecipeFilter({
	checkBoxFilter,
	selectedCountry,
	resetCountries,
	checkBoxDishes,
	selectedDishes,
	resetDishes,
	checkBoxDesserts,
	selectedDesserts,
	resetDesserts,
	checkBoxAllergens,
	selectedAllergens,
	resetAllergens,
}: checkBoxFilterProps) {
	const [filter, setFilter] = useState<Filter>("");
	useEffect(() => {
		function closeDropdown() {
			setFilter("");
		}

		window.addEventListener("scroll", closeDropdown);

		return () => {
			window.removeEventListener("scroll", closeDropdown);
		};
	}, []);

	return (
		<section className="recipe-filter">
			<div className="filter-buttons">
				{/* Countries */}
				<div className="filter-item">
					<button
						className="btn btn-secondary filter-button"
						type="button"
						onClick={() => setFilter(filter === "Countries" ? "" : "Countries")}
					>
						Countries <i className="bi bi-caret-down-fill" />
					</button>

					{filter === "Countries" && (
						<ul className="dropdown-menu show countries-menu">
							<li>
								<label className="dropdown-item">
									<input
										type="checkbox"
										checked={selectedCountry.length === 0}
										onChange={resetCountries}
									/>
									All
								</label>
							</li>

							{countries.map((country) => (
								<li key={country.country}>
									<label className="dropdown-item">
										<input
											type="checkbox"
											checked={selectedCountry.includes(country.country)}
											onChange={() => checkBoxFilter(country.country)}
										/>
										{country.country} {country.flag}
									</label>
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="filter-item">
					<button
						className="btn btn-secondary filter-button"
						type="button"
						onClick={() => setFilter(filter === "Dishes" ? "" : "Dishes")}
					>
						Dishes <i className="bi bi-caret-down-fill" />
					</button>
					{filter === "Dishes" && (
						<ul className="dropdown-menu show countries-menu">
							<li>
								<label className="dropdown-item">
									<input
										type="checkbox"
										checked={selectedDishes.length === 0}
										onChange={resetDishes}
									/>
									All
								</label>
							</li>
							{dishes.map((dishe) => (
								<li key={dishe}>
									<label className="dropdown-item">
										<input
											type="checkbox"
											checked={selectedDishes.includes(dishe)}
											onChange={() => checkBoxDishes(dishe)}
										/>
										{dishe}
									</label>
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="filter-item">
					<button
						className="btn btn-secondary filter-button"
						type="button"
						onClick={() => setFilter(filter === "Desserts" ? "" : "Desserts")}
					>
						Desserts <i className="bi bi-caret-down-fill" />
					</button>
					{filter === "Desserts" && (
						<ul className="dropdown-menu show countries-menu">
							<li>
								<label className="dropdown-item">
									<input
										type="checkbox"
										checked={selectedDesserts.length === 0}
										onChange={resetDesserts}
									/>
									All
								</label>
							</li>
							{desserts.map((dessert) => (
								<li key={dessert.name}>
									<label className="dropdown-item">
										<input
											type="checkbox"
											checked={selectedDesserts.includes(dessert.name)}
											onChange={() => checkBoxDesserts(dessert.name)}
										/>
										{dessert.name}
									</label>
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="filter-item">
					<button
						className="btn btn-secondary filter-button"
						type="button"
						onClick={() => setFilter(filter === "Allergens" ? "" : "Allergens")}
					>
						Allergens <i className="bi bi-caret-down-fill" />
					</button>
					{filter === "Allergens" && (
						<ul className="dropdown-menu show countries-menu">
							<li>
								<label className="dropdown-item">
									<input
										type="checkbox"
										checked={selectedAllergens.length === 0}
										onChange={resetAllergens}
									/>
									None
								</label>
							</li>

							{allergens.map((allergen) => (
								<li key={allergen.name}>
									<label className="dropdown-item">
										<input
											type="checkbox"
											checked={selectedAllergens.includes(allergen.name)}
											onChange={() => checkBoxAllergens(allergen.name)}
										/>
										<span
											style={{
												textDecoration: selectedAllergens.includes(
													allergen.name,
												)
													? "line-through"
													: "none",
											}}
										>
											{allergen.name}
										</span>
									</label>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
}

export default RecipeFilter;
