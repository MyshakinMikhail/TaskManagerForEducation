import type { NoteStatusType } from "../pages/Notes/types/NoteStatus";
import type { ShortNoteType } from "../pages/Notes/types/ShortNoteType";

export const getStatus = (note: ShortNoteType): NoteStatusType | undefined => {
	const now = Date.now();
	const settled = new Date(note.date).getTime();
	if (settled < now) return "overdue";
	return;
};

export const getStatusByDate = (
	date: string = "2025-09-26T15:01:32.198Z"
): NoteStatusType => {
	const now = Date.now();
	const settled = new Date(date).getTime();
	if (settled < now) return "overdue";
	return "in-progress";
};

export const getNextStatusAfterClick = (note: ShortNoteType) => {
	if (note.status === "completed") {
		const now = Date.now();
		const currDate = new Date(note.date).getTime();
		if (now > currDate) {
			return "overdue";
		}
		return "in-progress";
	}

	return "completed";
};
