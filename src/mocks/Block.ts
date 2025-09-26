import type { BlockType } from "../pages/Notes/types/Block";
import { mockShortNotes } from "./ShortNotes";

export const mockBlocks: BlockType[] = [
	{
		id: "1",
		name: "Работа",
		notes: [mockShortNotes[0], mockShortNotes[1]],
	},
	{
		id: "2",
		name: "Учёба",
		notes: [mockShortNotes[2]],
	},
	{
		id: "3",
		name: "Личное",
		notes: [mockShortNotes[3]],
	},
];
