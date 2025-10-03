import { Navigate, Outlet } from "react-router-dom";
import { tokenApi } from "../api/token";

export default function ProtectedRouter() {
	const token = tokenApi.get();
	if (!token) return <Navigate to="/auth" replace />;

	return <Outlet />;
}
