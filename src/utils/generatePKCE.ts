function base64URLEncode(str: ArrayBuffer) {
	return btoa(String.fromCharCode(...new Uint8Array(str)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

export async function generatePKCE() {
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
