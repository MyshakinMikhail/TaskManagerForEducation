import { Dialog, Text } from "@gravity-ui/uikit";
import type { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../../../store/blocksReduser";
import type { ShortNoteType } from "../../types/ShortNoteType";
import classes from "./NoteDeleteDialog.module.css";

type Props = {
	blockId: string;
	note: ShortNoteType;
	isDialogOpen: boolean;
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function NoteDeleteDialog({
	blockId,
	note,
	isDialogOpen,
	setIsDialogOpen,
}: Props) {
	const dispatch = useDispatch();

	return (
		<Dialog
			className={classes.dialog}
			onClose={() => setIsDialogOpen(false)}
			open={isDialogOpen}
			onEnterKeyDown={() =>
				dispatch(deleteNote({ blockId, noteId: note.id }))
			}
		>
			<Dialog.Header
				className={classes.dialogHeader}
				caption={
					<Text variant="body-3" color="warning">
						Вы уверены, что хотите УДАЛИТЬ заметку?
					</Text>
				}
			/>
			<Dialog.Body>
				<Text variant="body-2" className={classes.dialogText}>
					Это действие нельзя отменить. Все данные внутри заметки
					будут удалены без возможности восстановления.
				</Text>
			</Dialog.Body>
			<Dialog.Footer
				onClickButtonCancel={() => setIsDialogOpen(false)}
				onClickButtonApply={() =>
					dispatch(deleteNote({ blockId, noteId: note.id }))
				}
				textButtonApply="Удалить"
				textButtonCancel="Отмена"
			/>
		</Dialog>
	);
}
