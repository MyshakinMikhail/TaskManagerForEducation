import type { User } from "../pages/Auth/types/User";

const STORAGE_KEY = "user";

export const userApi = {
	get: () => {
		const user = localStorage.getItem(STORAGE_KEY);
		return user ? JSON.parse(user) : null;
	},

	set: (user: User) => {
		const storageUser = JSON.stringify(user);
		localStorage.setItem(STORAGE_KEY, storageUser);
	},
	remove: () => {
		localStorage.removeItem(STORAGE_KEY);
	},
};
