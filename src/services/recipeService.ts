import type {
	GetRecipes,
	Letters,
	Recipe,
	RecipesRequest,
} from "../types/types";

const letters: Letters = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

const getRecipes: GetRecipes = (letter: string) => {
	return fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
	).then((response) => response.json());
};

const request: RecipesRequest = [];

for (let i = 0; i < letters.length; i++) {
	request.push(getRecipes(letters[i]));
}

function getAllRecipes(): Promise<Recipe[]> {
	return Promise.all(request).then((data) => {
		return data.flatMap((item) => item.meals ?? []);
	});
}

export default getAllRecipes;
