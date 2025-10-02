import type { User } from "../pages/Auth/types/User";

const STORAGE_KEY = "user";

export const userApi = {
	get: (): User | null => {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? JSON.parse(saved) : null;
	},

	set: (user: User) => {
		const storageUser = JSON.stringify(user);
		localStorage.setItem(STORAGE_KEY, storageUser);
	},
	remove: () => {
		localStorage.removeItem(STORAGE_KEY);
	},
};
