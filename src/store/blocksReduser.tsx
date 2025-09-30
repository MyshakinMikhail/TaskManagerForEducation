import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uniqueId } from "uuid";
import { storage } from "../api/storage";

import type { BlockType } from "../pages/Notes/types/Block";
import type { NoteStatusType } from "../pages/Notes/types/NoteStatus";
import type { ShortNoteType } from "../pages/Notes/types/ShortNoteType";
import { parseReadableToISO } from "../utils/getFormattedDate";
import { getStatus, getStatusByDate } from "../utils/getStatus";

type initialStateType = {
	blocks: BlockType[];
};

const initialState: initialStateType = { blocks: storage.get() };

const blocksSlice = createSlice({
	name: "blocks",
	initialState,
	reducers: {
		updateNameBlock: (
			state,
			action: PayloadAction<{ blockId: string; blockName: string }>
		) => {
			state.blocks = state.blocks.map((currBlock) =>
				currBlock.id === action.payload.blockId
					? { ...currBlock, name: action.payload.blockName }
					: currBlock
			);
			storage.set(state.blocks);
		},
		addEmptyBlock: (state) => {
			const block = {
				id: uniqueId(),
				name: "Новый блок",
				notes: [],
			};

			state.blocks = [...state.blocks, block];
			storage.set(state.blocks);
		},
		removeBlock: (state, action: PayloadAction<{ id: string }>) => {
			state.blocks = state.blocks.filter(
				(block: BlockType) => block.id !== action.payload.id
			);

			storage.set(state.blocks);
		},
		addEmptyNote: (state, action: PayloadAction<{ blockId: string }>) => {
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

			state.blocks = state.blocks.map((block) =>
				block.id === action.payload.blockId
					? { ...block, notes: [...block.notes, newNote] }
					: block
			);

			storage.set(state.blocks);
		},
		updateNote: (
			state,
			action: PayloadAction<{
				blockId: string;
				selectedNote: ShortNoteType;
			}>
		) => {
			const newStatus = getStatusByDate(
				parseReadableToISO(action.payload.selectedNote.date)
			);

			state.blocks = state.blocks.map((block) =>
				block.id === action.payload.blockId
					? {
							...block,
							notes: block.notes.map((note) =>
								note.id === action.payload.selectedNote.id
									? {
											...note,
											status: newStatus ?? note.status,
											description:
												action.payload.selectedNote
													.description,
											date: parseReadableToISO(
												action.payload.selectedNote.date
											),
									  }
									: note
							),
					  }
					: block
			);

			storage.set(state.blocks);
		},
		changeStatus: (
			state,
			action: PayloadAction<{
				blockId: string;
				selectedNote: ShortNoteType;
			}>
		) => {
			const nextStatus: NoteStatusType =
				action.payload.selectedNote.status === "completed"
					? "in-progress"
					: "completed";

			state.blocks = state.blocks.map((block) =>
				block.id === action.payload.blockId
					? {
							...block,
							notes: block.notes.map((note) =>
								note.id === action.payload.selectedNote.id
									? {
											...note,
											status: nextStatus,
									  }
									: note
							),
					  }
					: block
			);

			storage.set(state.blocks);
		},
		deleteNote: (
			state,
			action: PayloadAction<{ blockId: string; noteId: string }>
		) => {
			// blockId, noteId
			state.blocks = state.blocks.map((block) =>
				block.id === action.payload.blockId
					? {
							...block,
							notes: block.notes.filter(
								(note) => note.id !== action.payload.noteId
							),
					  }
					: block
			);

			storage.set(state.blocks);
		},
		updateNoteStatus: (
			state,
			action: PayloadAction<{
				blockId: string;
				selectedNote: ShortNoteType;
			}>
		) => {
			if (action.payload.selectedNote.status === "completed") return;

			const newStatus =
				getStatus(action.payload.selectedNote) ??
				action.payload.selectedNote.status;

			if (newStatus !== action.payload.selectedNote.status) {
				state.blocks = state.blocks.map((block) =>
					block.id === action.payload.blockId
						? {
								...block,
								notes: block.notes.map((note) =>
									note.id === action.payload.selectedNote.id
										? { ...note, status: newStatus }
										: note
								),
						  }
						: block
				);

				storage.set(state.blocks);
			}
		},
	},
});

export const { updateNameBlock } = blocksSlice.actions;
export default blocksSlice.reducer;
