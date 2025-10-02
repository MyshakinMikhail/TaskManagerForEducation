import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pkceApi } from "../../api/pkce";
import { tokenApi } from "../../api/token";
import { userApi } from "../../api/user";
import type { User } from "../../pages/Auth/types/User";
import { AuthContext } from "./AuthContext";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

function base64URLEncode(str: ArrayBuffer) {
	return btoa(String.fromCharCode(...new Uint8Array(str)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

async function generatePKCE() {
	const array = new Uint8Array(32);
	crypto.getRandomValues(array);
	const codeVerifier = base64URLEncode(array.buffer);

	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(codeVerifier)
	);
	const codeChallenge = base64URLEncode(digest);

	return { codeVerifier, codeChallenge };
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(userApi.get());
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const login = useCallback(async () => {
		const { codeVerifier, codeChallenge } = await generatePKCE();
		pkceApi.set(codeVerifier);

		const url =
			`https://oauth.yandex.ru/authorize?response_type=code` +
			`&client_id=${CLIENT_ID}` +
			`&redirect_uri=${REDIRECT_URI}` +
			`&code_challenge=${codeChallenge}` +
			`&code_challenge_method=S256`;

		window.location.href = url;
	}, []);

	const handleCallback = useCallback(async () => {
		const params = new URLSearchParams(window.location.search);
		const code = params.get("code");
		const codeVerifier = pkceApi.get();

		if (code && codeVerifier) {
			setLoading(true);

			const res = await fetch("https://oauth.yandex.ru/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					grant_type: "authorization_code",
					code,
					client_id: CLIENT_ID,
					code_verifier: codeVerifier,
					redirect_uri: REDIRECT_URI,
				}),
			});

			const data = await res.json();

			if (data.access_token) {
				const infoRes = await fetch("https://login.yandex.ru/info", {
					headers: { Authorization: `OAuth ${data.access_token}` },
				});

				const userInfo = await infoRes.json();
				console.log(userInfo);
				const convertedUserInfo: User = {
					id: userInfo.id,
					firstName: userInfo.first_name,
					lastName: userInfo.last_name,
				};
				setUser(convertedUserInfo);
				userApi.set(convertedUserInfo);
				tokenApi.set(data.access_token);

				// очищаем ?code из URL
				window.history.replaceState({}, document.title, "/");
				navigate("/statusAuth", { replace: true });
			}

			setLoading(false);
		}
	}, [navigate]);

	const logout = useCallback(() => {
		setUser(null);
		userApi.remove();
		tokenApi.remove();
		navigate("/auth", { replace: true });
	}, [navigate]);

	// автоматически проверяем callback при монтировании
	useEffect(() => {
		handleCallback();
	}, [handleCallback]);

	return (
		<AuthContext.Provider
			value={{ user, loading, login, logout, handleCallback }}
		>
			{children}
		</AuthContext.Provider>
	);
}
