import { settings } from "@gravity-ui/date-utils";
import { ThemeProvider } from "@gravity-ui/uikit";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/Notes/Notes";

settings.loadLocale("en");

function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<ThemeProvider theme="dark" lang="en">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<NotesPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</DndProvider>
	);
}

export default App;
