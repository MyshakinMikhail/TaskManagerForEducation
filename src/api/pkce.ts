const STORAGE_KEY = "pkce_verifier";

export const pkceApi = {
	get: () => {
		return localStorage.getItem(STORAGE_KEY);
	},
	set: (codeVerifier: string) => {
		localStorage.setItem(STORAGE_KEY, codeVerifier);
	},
	remove: () => {
		localStorage.removeItem(STORAGE_KEY);
	},
};
