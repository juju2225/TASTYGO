const quotes = [
	{
		id: 1,
		text: "You cannot cook well if you do not love people.",
		author: "Joël Robuchon",
	},
	{
		id: 2,
		text: "Good food is the foundation of genuine happiness.",
		author: "Auguste Escoffier",
	},
	{
		id: 3,
		text: "Cooking is when things taste like what they are.",
		author: "Paul Bocuse",
	},
	{
		id: 4,
		text: "Cooking is an art, and every art requires patience.",
		author: "Guy Savoy",
	},
	{
		id: 5,
		text: "Cooking is about love and generosity.",
		author: "Alain Ducasse",
	},
	{
		id: 6,
		text: "Learn how to cook, try new recipes, learn from your mistakes, be fearless, and above all have fun!",
		author: "Julia Child",
	},
	{
		id: 7,
		text: "Cooking is a philosophy; it's not a recipe.",
		author: "Marco Pierre White",
	},
	{
		id: 8,
		text: "The secret of a good meal is simplicity and the right seasoning.",
		author: "Gordon Ramsay",
	},
	{
		id: 9,
		text: "A recipe has no soul. You, as the cook, must bring soul to the recipe.",
		author: "Thomas Keller",
	},
	{
		id: 10,
		text: "Cooking is an observation-based process that you cannot do if you're so completely focused on a recipe.",
		author: "Alton Brown",
	},
	{
		id: 11,
		text: "The most important thing in cooking is to have fun.",
		author: "Jamie Oliver",
	},
	{
		id: 12,
		text: "Food is our common ground, a universal experience.",
		author: "James Beard",
	},
	{
		id: 13,
		text: "Cooking is a way of giving, and giving is a way of loving.",
		author: "Massimo Bottura",
	},
	{
		id: 14,
		text: "The best dishes are those that tell a story.",
		author: "René Redzepi",
	},
	{
		id: 15,
		text: "Great cooking is about being inspired by the simple things around you.",
		author: "Alice Waters",
	},
	{
		id: 16,
		text: "Cooking is not just about ingredients; it is about emotions.",
		author: "Anne-Sophie Pic",
	},
	{
		id: 17,
		text: "The kitchen is a place where creativity meets discipline.",
		author: "Heston Blumenthal",
	},
	{
		id: 18,
		text: "A great dish begins with respect for its ingredients.",
		author: "Éric Ripert",
	},
	{
		id: 19,
		text: "The greatest pleasure in cooking is sharing what you create.",
		author: "José Andrés",
	},
	{
		id: 20,
		text: "Food should make people happy and bring them together.",
		author: "Nobu Matsuhisa",
	},
	{
		id: 21,
		text: "Every ingredient has a story waiting to be told.",
		author: "Dominique Crenn",
	},
	{
		id: 22,
		text: "The beauty of cooking lies in the balance of flavors.",
		author: "Yotam Ottolenghi",
	},
	{
		id: 23,
		text: "A chef must always remain curious and willing to learn.",
		author: "Ferran Adrià",
	},
	{
		id: 24,
		text: "Cooking is about creating memories around the table.",
		author: "Nigella Lawson",
	},
	{
		id: 25,
		text: "Great food requires patience, dedication, and passion.",
		author: "Daniel Boulud",
	},
	{
		id: 26,
		text: "The simplest ingredients can create the most extraordinary dishes.",
		author: "Alain Passard",
	},
	{
		id: 27,
		text: "Cooking is a language that everyone can understand.",
		author: "Gaggan Anand",
	},
	{
		id: 28,
		text: "The heart of cooking is respecting the traditions that inspire us.",
		author: "Enrique Olvera",
	},
	{
		id: 29,
		text: "A great chef never stops discovering new flavors.",
		author: "Mauro Colagreco",
	},
	{
		id: 30,
		text: "Food connects people across cultures and generations.",
		author: "Pía León",
	},
	{
		id: 31,
		text: "Cooking is an expression of who we are and where we come from.",
		author: "Virgilio Martínez",
	},
	{
		id: 32,
		text: "The secret to great cooking is understanding your ingredients.",
		author: "Wolfgang Puck",
	},
	{
		id: 33,
		text: "A beautiful dish should delight both the eyes and the palate.",
		author: "Pierre Gagnaire",
	},
	{
		id: 34,
		text: "Cooking is about harmony between flavors, textures, and emotions.",
		author: "Rasmus Kofoed",
	},
	{
		id: 35,
		text: "The best cooking comes from the heart.",
		author: "Clare Smyth",
	},
	{
		id: 36,
		text: "Food is a celebration of life and the people we share it with.",
		author: "Gastón Acurio",
	},
	{
		id: 37,
		text: "The kitchen is where imagination becomes reality.",
		author: "Grant Achatz",
	},
	{
		id: 38,
		text: "A good chef knows that perfection is found in the details.",
		author: "Sergio Herman",
	},
	{
		id: 39,
		text: "Cooking is a journey of discovery that never truly ends.",
		author: "Andoni Luis Aduriz",
	},
	{
		id: 40,
		text: "The soul of a dish comes from the passion of the person preparing it.",
		author: "Helena Rizzo",
	},
	{
		id: 41,
		text: "Great food begins with great respect for nature.",
		author: "Dan Barber",
	},
	{
		id: 42,
		text: "The most memorable meals are those made with love.",
		author: "Lidia Bastianich",
	},
	{
		id: 43,
		text: "Cooking is an adventure that begins with curiosity.",
		author: "David Chang",
	},
	{
		id: 44,
		text: "Every dish should reflect the personality of its creator.",
		author: "Carme Ruscalleda",
	},
	{
		id: 45,
		text: "The magic of cooking is transforming ordinary ingredients into extraordinary experiences.",
		author: "Quique Dacosta",
	},
	{
		id: 46,
		text: "Food is one of the most powerful ways to share culture.",
		author: "Maneet Chauhan",
	},
	{
		id: 47,
		text: "The best recipes are the ones that bring people together.",
		author: "Rachael Ray",
	},
	{
		id: 48,
		text: "A chef's greatest ingredient is imagination.",
		author: "Alex Atala",
	},
	{
		id: 49,
		text: "Cooking is a balance between tradition and innovation.",
		author: "Yannick Alléno",
	},
	{
		id: 50,
		text: "A great meal is not just about food, but about the experience it creates.",
		author: "Hélène Darroze",
	},
];

export default quotes;
