import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "../types/types";
import getAllRecipes from "../services/recipeService";

interface RecipesContextType {
	recipes: Recipe[];
	loading: boolean;
	error: string | null;
	favorites: string[];
	toggleFavorite: (idMeal: string) => void;
	isFavorite: (idMeal: string) => boolean;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

interface RecipesProviderProps {
	children: ReactNode;
}

export function RecipesProvider({ children }: RecipesProviderProps) {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [favorites, setFavorites] = useState<string[]>(() => {
		const savedFavorites = localStorage.getItem("favorites");

		return savedFavorites ? JSON.parse(savedFavorites) : [];
	});

	useEffect(() => {
		let active = true;

		getAllRecipes()
			.then((data) => {
				if (active) {
					setRecipes(data);
				}
			})
			.catch(() => {
				if (active) {
					setError("Unable to load recipes");
				}
			})
			.finally(() => {
				if (active) {
					setLoading(false);
				}
			});

		return () => {
			active = false;
		};
	}, []);

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const toggleFavorite = (idMeal: string) => {
		setFavorites((previousFavorites) =>
			previousFavorites.includes(idMeal)
				? previousFavorites.filter((id) => id !== idMeal)
				: [...previousFavorites, idMeal],
		);
	};

	const isFavorite = (idMeal: string) => favorites.includes(idMeal);

	return (
		<RecipesContext.Provider
			value={{
				recipes,
				loading,
				error,
				favorites,
				toggleFavorite,
				isFavorite,
			}}
		>
			{children}
		</RecipesContext.Provider>
	);
}

export function useRecipes() {
	const context = useContext(RecipesContext);

	if (context === undefined) {
		throw new Error("useRecipes must be used within a RecipesProvider");
	}

	return context;
}
