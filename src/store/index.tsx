import { configureStore } from "@reduxjs/toolkit";
import blocksSlice from "./blocksReduser";

export const store = configureStore({
	reducer: {
		blocks: blocksSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
