import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "../types/types";
import getAllRecipes from "../services/recipeService";

interface RecipesContextType {
	recipes: Recipe[];
	loading: boolean;
	error: string | null;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

interface RecipesProviderProps {
	children: ReactNode;
}

export function RecipesProvider({ children }: RecipesProviderProps) {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

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

	return (
		<RecipesContext.Provider value={{ recipes, loading, error }}>
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
