// store/slices/types.ts
import type { BlockType } from "../../pages/Notes/types/Block";
import type { NoteStatusType } from "../../pages/Notes/types/NoteStatus";
import type { ShortNoteType } from "../../pages/Notes/types/ShortNoteType";

export type BlocksSlice = {
	blocks: BlockType[];
	initialBlocks: () => void;
	getBlocks: () => BlockType[];
	updateNameBlock: (blockId: string, blockName: string) => void;
	addEmptyBlock: () => void;
	removeBlock: (id: string) => void;
};

export type NotesSlice = {
	addEmptyNote: (blockId: string) => void;
	updateNote: (blockId: string, note: ShortNoteType) => void;
	changeStatus: (blockId: string, note: ShortNoteType) => void;
	deleteNote: (blockId: string, noteId: string) => void;
	updateNoteStatus: (blockId: string, note: ShortNoteType) => NoteStatusType;
};
