import type { BlockType } from "../pages/Notes/types/Block";

const STORAGE_KEY = "blocks";

export const blocksApi = {
	get: () => {
		const blocks = localStorage.getItem(STORAGE_KEY);
		return blocks ? JSON.parse(blocks) : [];
	},
	set: (blocks: BlockType[]) => {
		const blocksBlocks = JSON.stringify(blocks);
		localStorage.setItem(STORAGE_KEY, blocksBlocks);
	},
};
