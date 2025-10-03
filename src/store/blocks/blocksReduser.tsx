import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uniqueId } from "uuid";
import { blocksApi } from "../../api/blocks";

import type { BlockType } from "../../pages/Notes/types/Block";
import type { NoteStatusType } from "../../pages/Notes/types/NoteStatus";
import type { ShortNoteType } from "../../pages/Notes/types/ShortNoteType";
import { parseReadableToISO } from "../../utils/getFormattedDate";
import { getNextStatusAfterClick, getStatusByDate } from "../../utils/getStatus";

type initialStateType = {
	blocks: BlockType[];
};

const initialState: initialStateType = { blocks: blocksApi.get() };

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
			blocksApi.set(state.blocks);
		},
		addEmptyBlock: (state) => {
			const block = {
				id: uniqueId(),
				name: "Новый блок",
				notes: [],
			};

			state.blocks = [...state.blocks, block];
			blocksApi.set(state.blocks);
		},
		removeBlock: (state, action: PayloadAction<{ id: string }>) => {
			state.blocks = state.blocks.filter(
				(block: BlockType) => block.id !== action.payload.id
			);

			blocksApi.set(state.blocks);
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

			blocksApi.set(state.blocks);
		},
		updateNote: (
			state,
			action: PayloadAction<{
				blockId: string;
				selectedNote: ShortNoteType;
			}>
		) => {
			const newStatus = getStatusByDate(action.payload.selectedNote);

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

			blocksApi.set(state.blocks);
		},
		changeStatus: (
			state,
			action: PayloadAction<{
				blockId: string;
				selectedNote: ShortNoteType;
			}>
		) => {
			const nextStatus: NoteStatusType = getNextStatusAfterClick(
				action.payload.selectedNote
			);

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
			blocksApi.set(state.blocks);
		},
		deleteNote: (
			state,
			action: PayloadAction<{ blockId: string; noteId: string }>
		) => {
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

			blocksApi.set(state.blocks);
		},
	},
});

export const {
	updateNameBlock,
	addEmptyBlock,
	removeBlock,
	addEmptyNote,
	updateNote,
	changeStatus,
	deleteNote,
} = blocksSlice.actions;
export default blocksSlice.reducer;
