import type { NoteStatusType } from "./NoteStatus";

export type ShortNoteType = {
	id: string;
	status: NoteStatusType;
	description: string;
	date: string; // пока что string, разберусь с календарем и поменяю
};
