import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@gravity-ui/uikit";
import App from "./App.tsx";
import "./index.css";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<App />
	</ThemeProvider>
);
