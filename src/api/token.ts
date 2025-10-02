const STORAGE_KEY = "token";

export const tokenApi = {
	get: () => {
		return localStorage.getItem(STORAGE_KEY);
	},

	set: (token: string) => {
		localStorage.setItem(STORAGE_KEY, token);
	},
	remove: () => {
		localStorage.removeItem(STORAGE_KEY);
	},
};
