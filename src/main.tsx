import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

createRoot(document.getElementById("root")!).render(<App />);
