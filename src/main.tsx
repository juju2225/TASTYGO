import { createRoot } from "react-dom/client";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { RecipesProvider } from "./contexts/RecipesContext";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<RecipesProvider>
			<App />
		</RecipesProvider>
	</BrowserRouter>,
);
