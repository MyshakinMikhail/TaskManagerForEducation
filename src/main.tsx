import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { Provider } from "react-redux";
import { store } from "./store/index.tsx";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
