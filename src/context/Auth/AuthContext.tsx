import { createContext } from "react";
import type { User } from "../../pages/Auth/types/User";

type AuthContextType = {
	user: User | null;
	loading: boolean;
	login: () => void;
	logout: () => void;
	handleCallback: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);
