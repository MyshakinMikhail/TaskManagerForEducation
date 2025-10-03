import { ThemeProvider } from "@gravity-ui/uikit";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth/Auth";
import NotesPage from "./pages/Notes/Notes";
import StatusAuthPage from "./pages/StatusAuth/StatusAuth";
import ProtectedRouter from "./routes/ProtectedRouter";

export default function App() {
	return (
		<ThemeProvider theme="dark" lang="en">
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedRouter />}>
						<Route path="/" element={<NotesPage />} />
					</Route>

					<Route path="/auth" element={<AuthPage />} />
					<Route path="/statusAuth" element={<StatusAuthPage />} />
					<Route path="*" element={<Navigate to="/auth" replace />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}
