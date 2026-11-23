import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useRecipes } from "../../contexts/RecipesContext";
import type { Recipe } from "../../types/types";
import quotes from "../../data/quotes";
import FeaturedRecipes from "./FeaturedRecipes/FeaturedRecipes";
import QuoteSection from "./QuoteSection/QuoteSection";
import "./Home.css";

function Home() {
	const { recipes } = useRecipes();

	const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);
	const [quoteIndex, setQuoteIndex] = useState(0);

	useEffect(() => {
		if (recipes.length === 0) return;

		const updateContent = () => {
			const shuffledRecipes = [...recipes];

			for (let i = shuffledRecipes.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));

				[shuffledRecipes[i], shuffledRecipes[j]] = [
					shuffledRecipes[j],
					shuffledRecipes[i],
				];
			}

			setRandomRecipes(shuffledRecipes.slice(0, 5));

			setQuoteIndex((previousIndex) => {
				if (quotes.length <= 1) return 0;

				const offset = 1 + Math.floor(Math.random() * (quotes.length - 1));

				return (previousIndex + offset) % quotes.length;
			});
		};

		updateContent();

		const interval = setInterval(updateContent, 10000);

		return () => clearInterval(interval);
	}, [recipes]);

	return (
		<>
			<h1 className="home-title">Welcome</h1>

			<FeaturedRecipes recipes={randomRecipes} />

			<QuoteSection quote={quotes[quoteIndex]} />

			<Link to="/all-recipes" className="featured-all-button">
				All recipes
			</Link>
		</>
	);
}

export default Home;
