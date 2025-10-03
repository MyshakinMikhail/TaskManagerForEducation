import { createAsyncThunk } from "@reduxjs/toolkit";
import { pkceApi } from "../../api/pkce";
import { tokenApi } from "../../api/token";
import type { User } from "../../pages/Auth/types/User";
import { generatePKCE } from "../../utils/generatePKCE";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const login = createAsyncThunk("auth/login", async () => {
	const { codeVerifier, codeChallenge } = await generatePKCE();
	pkceApi.set(codeVerifier);

	const url =
		`https://oauth.yandex.ru/authorize?response_type=code` +
		`&client_id=${CLIENT_ID}` +
		`&redirect_uri=${REDIRECT_URI}` +
		`&code_challenge=${codeChallenge}` +
		`&code_challenge_method=S256`;

	window.location.href = url;
});

export const handleCallback = createAsyncThunk(
	"auth/handleCallback",
	async (_, { rejectWithValue }) => {
		const params = new URLSearchParams(window.location.search);
		const code = params.get("code");
		const codeVerifier = pkceApi.get();

		if (!code || !codeVerifier) return rejectWithValue("no code");

		try {
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
			if (!data.access_token) return rejectWithValue("no token");

			const infoRes = await fetch("https://login.yandex.ru/info", {
				headers: { Authorization: `OAuth ${data.access_token}` },
			});

			const userInfo = await infoRes.json();
			const convertedUserInfo: User = {
				id: userInfo.id,
				firstName: userInfo.first_name,
				lastName: userInfo.last_name,
			};

			tokenApi.set(data.access_token);
			pkceApi.remove();
			window.history.replaceState({}, document.title, "/");

			return convertedUserInfo;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
