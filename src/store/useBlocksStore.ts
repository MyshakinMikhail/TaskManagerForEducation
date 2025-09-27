// store/useBlocksStore.ts
import type { StateCreator } from "zustand";
import { create } from "zustand";
import { createBlocksSlice } from "./slices/blocksSlice";
import { createNotesSlice } from "./slices/notesSlice";
import type { BlocksSlice, NotesSlice } from "./slices/types";

// объединяем все слайсы
type StoreState = BlocksSlice & NotesSlice;

// типизированный StateCreator
const storeCreator: StateCreator<StoreState> = (set, get) => ({
	...createBlocksSlice(set, get),
	...createNotesSlice(set, get),
});

export const useBlocksStore = create<StoreState>(storeCreator);
