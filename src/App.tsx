import { settings } from "@gravity-ui/date-utils";
import { ThemeProvider } from "@gravity-ui/uikit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/Notes/Notes";

settings.loadLocale("en");

function App() {
	return (
		<ThemeProvider theme="dark" lang="en">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<NotesPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
