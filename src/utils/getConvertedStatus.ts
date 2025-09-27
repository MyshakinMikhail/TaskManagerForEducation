import type {
	ConvertedNoteStatuses,
	NoteStatusType,
} from "../pages/Notes/types/NoteStatus";

export function getConvertedStatus(
	status: NoteStatusType
): ConvertedNoteStatuses {
	switch (status) {
		case "in-progress":
			return "В процессе";
		case "completed":
			return "Выполнено";
		case "overdue":
			return "Просрочено";
	}
}
