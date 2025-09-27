// store/slices/notesSlice.ts
import { v4 as uniqueId } from "uuid";
import type { StateCreator } from "zustand";
import { storage } from "../../api/storage";
import type { BlockType } from "../../pages/Notes/types/Block";
import type { NoteStatusType } from "../../pages/Notes/types/NoteStatus";
import type { ShortNoteType } from "../../pages/Notes/types/ShortNoteType";
import { parseReadableToISO } from "../../utils/getFormattedDate";
import { getStatus, getStatusByDate } from "../../utils/getStatus";
import type { NotesSlice } from "./types";

export const createNotesSlice: StateCreator<
	NotesSlice & { blocks: BlockType[] }, // blocks будут использоваться внутри
	[],
	[],
	NotesSlice
> = (set, get) => ({
	addEmptyNote: (blockId) => {
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
								? { ...note, status: nextStatus }
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
});
