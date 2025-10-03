import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authReducer";
import blocksSlice from "./blocks/blocksReduser";

export const store = configureStore({
	reducer: {
		blocks: blocksSlice,
		auth: authSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
