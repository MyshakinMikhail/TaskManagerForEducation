import type { ShortNoteType } from "../pages/Notes/types/ShortNoteType";

export const mockShortNotes: ShortNoteType[] = [
	{
		id: "1",
		status: "in-progress",
		description: "Сделать макет для новой страницы заметок",
		date: "2025-09-24",
	},
	{
		id: "2",
		status: "completed",
		description: "Реализовать авторизацию через Google",
		date: "2025-09-20",
	},
	{
		id: "3",
		status: "overdue",
		description: "Написать тесты для компонента ContentHeader",
		date: "2025-09-15",
	},
	{
		id: "4",
		status: "in-progress",
		description: "Добавить поддержку локализации для DatePicker",
		date: "2025-09-25",
	},
];
