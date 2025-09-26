import type { ShortNoteType } from "./ShortNoteType";

export type BlockType = {
	id: string;
	name: string;
	notes: ShortNoteType[];
};
