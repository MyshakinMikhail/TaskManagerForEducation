// store/slices/blocksSlice.ts
import { v4 as uniqueId } from "uuid";
import type { StateCreator } from "zustand";
import { storage } from "../../api/storage";
import type { BlockType } from "../../pages/Notes/types/Block";
import type { BlocksSlice } from "./types";

export const createBlocksSlice: StateCreator<
	BlocksSlice,
	[],
	[],
	BlocksSlice
> = (set, get) => ({
	blocks: [],

	initialBlocks: () => {
		const blocks = storage.get();
		set({ blocks });
	},

	getBlocks: () => {
		const blocks = get().blocks;
		set({ blocks });
		return blocks;
	},

	updateNameBlock: (blockId, blockName) => {
		const blocks = get().blocks;
		const updatedBlocks = blocks.map((currBlock: BlockType) =>
			currBlock.id === blockId
				? { ...currBlock, name: blockName }
				: currBlock
		);
		set({ blocks: updatedBlocks });
		storage.set(updatedBlocks);
	},

	addEmptyBlock: () => {
		const block = {
			id: uniqueId(),
			name: "Новый блок",
			notes: [],
		};

		const blocks = get().blocks;
		const updatedBlocks = [...blocks, block];
		set({ blocks: updatedBlocks });
		storage.set(updatedBlocks);
	},

	removeBlock: (id: string) => {
		const blocks = get().blocks;
		const filteredBlocks = blocks.filter(
			(block: BlockType) => block.id !== id
		);
		set({ blocks: filteredBlocks });
		storage.set(filteredBlocks);
	},
});
