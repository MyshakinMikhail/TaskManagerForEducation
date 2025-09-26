import type { BlockType } from "../pages/Notes/types/Block";

const STORAGE_KEY = "blocks";

export const storage = {
	get: () => {
		const blocks = localStorage.getItem(STORAGE_KEY);
		return blocks ? JSON.parse(blocks) : [];
	},
	set: (blocks: BlockType[]) => {
		const storageBlocks = JSON.stringify(blocks);
		localStorage.setItem(STORAGE_KEY, storageBlocks);
	},
};
