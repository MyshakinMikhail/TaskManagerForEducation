import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { tokenApi } from "../../api/token";
import type { User } from "../../pages/Auth/types/User";
import { handleCallback } from "./authThunks";

export type AuthState = {
	user: User | null;
	loading: boolean;
};

const initialState: AuthState = {
	user: null,
	loading: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			tokenApi.remove();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleCallback.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				handleCallback.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.loading = false;
					state.user = action.payload;
					console.log("add user");
				}
			)
			.addCase(handleCallback.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
