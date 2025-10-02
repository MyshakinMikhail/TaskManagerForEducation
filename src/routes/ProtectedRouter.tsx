import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/useAuth";

export default function ProtectedRouter() {
	const { user, loading } = useAuth();

	if (loading) return <p>Загрузка...</p>;

	if (!user) return <Navigate to="/auth" replace />;

	return <Outlet />;
}
