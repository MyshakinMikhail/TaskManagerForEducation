import { v4 as uniqueId } from "uuid";
import { create } from "zustand";
import { storage } from "../api/storage";

import type { BlockType } from "../pages/Notes/types/Block";
import type { NoteStatusType } from "../pages/Notes/types/NoteStatus";
import type { ShortNoteType } from "../pages/Notes/types/ShortNoteType";
import { parseReadableToISO } from "../utils/getFormattedDate";
import { getStatus, getStatusByDate } from "../utils/getStatus";

type useBlocksState = {
	blocks: BlockType[];
	initialBlocks: () => void;
	getBlocks: () => BlockType[];

	updateNameBlock: (blockId: string, blockName: string) => void;
	addEmptyBlock: () => void;
	removeBlock: (id: string) => void;

	addEmptyNote: (blockId: string) => void;
	updateNote: (blockId: string, note: ShortNoteType) => void;
	deleteNote: (blockId: string, noteId: string) => void;

	changeStatus: (blockId: string, note: ShortNoteType) => void;
	updateNoteStatus: (blockId: string, note: ShortNoteType) => NoteStatusType;
};

export const useBlocksStore = create<useBlocksState>((set, get) => ({
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
		const updatedBlocks = blocks.map((currBlock) =>
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

	addEmptyNote: (blockId: string) => {
		const now = new Date();
		const tomorrow = new Date(
			now.getTime() + 60 * 60 * 1000 * 24
		).toISOString();
		const newNote: ShortNoteType = {
			id: uniqueId(),
			status: "in-progress",
			description: "Сделать макет для новой страницы заметок",
			date: tomorrow,
		};
		const blocks = get().blocks;
		const updatedBlocks = blocks.map((block) =>
			block.id === blockId
				? { ...block, notes: [...block.notes, newNote] }
				: block
		);
		set({ blocks: updatedBlocks });
		storage.set(updatedBlocks);
	},

	updateNote: (blockId, selectedNote) => {
		const newStatus = getStatusByDate(
			parseReadableToISO(selectedNote.date)
		);
		const blocks = get().blocks;
		const updatedBlocks = blocks.map((block) =>
			block.id === blockId
				? {
						...block,
						notes: block.notes.map((note) =>
							note.id === selectedNote.id
								? {
										...note,
										status: newStatus ?? note.status,
										description: selectedNote.description,
										date: parseReadableToISO(
											selectedNote.date
										),
								  }
								: note
						),
				  }
				: block
		);
		set({ blocks: updatedBlocks });
		storage.set(updatedBlocks);
	},

	changeStatus: (blockId, selectedNote) => {
		const blocks = get().blocks;
		const nextStatus: NoteStatusType =
			selectedNote.status === "completed" ? "in-progress" : "completed";
		const updatedBlocks = blocks.map((block) =>
			block.id === blockId
				? {
						...block,
						notes: block.notes.map((note) =>
							note.id === selectedNote.id
								? {
										...note,
										status: nextStatus,
								  }
								: note
						),
				  }
				: block
		);
		set({ blocks: updatedBlocks });
		storage.set(updatedBlocks);
	},
	deleteNote: (blockId, noteId) => {
		const blocks = get().blocks;
		const filteredBlocks = blocks.map((block) =>
			block.id === blockId
				? {
						...block,
						notes: block.notes.filter((note) => note.id !== noteId),
				  }
				: block
		);
		set({ blocks: filteredBlocks });
		storage.set(filteredBlocks);
	},
	updateNoteStatus: (blockId, selectedNote) => {
		if (selectedNote.status === "completed") return "completed";

		const newStatus = getStatus(selectedNote) ?? selectedNote.status;
		if (newStatus !== selectedNote.status) {
			const blocks = get().blocks;
			const updatedBlocks = blocks.map((block) =>
				block.id === blockId
					? {
							...block,
							notes: block.notes.map((note) =>
								note.id === selectedNote.id
									? { ...note, status: newStatus }
									: note
							),
					  }
					: block
			);
			set({ blocks: updatedBlocks });
			storage.set(updatedBlocks);
		}

		return newStatus;
	},
}));
