import type { NoteStatusType } from "../pages/Notes/types/NoteStatus";

export function getStatusColor(status: NoteStatusType) {
	switch (status) {
		case "completed":
			return "success";
		case "in-progress":
			return "info";
		case "overdue":
			return "danger";
	}
}
