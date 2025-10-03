import { Card, Modal, Text } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useModal } from "../../../../context/Modal/useModal";
import type { ShortNoteType } from "../../types/ShortNoteType";
import NoteCardHeader from "../NoteCardHeader/NoteCardHeader";
import NoteDeleteDialog from "../NoteDeleteDialog/NoteDeleteDialog";
import NoteModal from "../NoteModal/NoteModal";
import { formatISODateToReadable } from "./../../../../utils/getFormattedDate";
import classes from "./NoteCard.module.css";
type Props = {
	blockId: string;
	note: ShortNoteType;
};
export default function NoteCard({ blockId, note }: Props) {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const { setIsModalOpen } = useModal();

	useEffect(() => {
		setIsModalOpen(open || isDialogOpen);
	}, [open, isDialogOpen, setIsModalOpen]);

	return (
		<>
			<Card className={classes.noteCard}>
				<NoteCardHeader
					blockId={blockId}
					note={note}
					setOpen={setOpen}
					setIsDialogOpen={setIsDialogOpen}
				/>
				<Text>{note.description}</Text>
				<Text color="warning">
					{formatISODateToReadable(note.date)}
				</Text>
			</Card>

			<Modal open={open} onOpenChange={() => setOpen(false)}>
				<NoteModal blockId={blockId} note={note} setOpen={setOpen} />
			</Modal>

			<NoteDeleteDialog
				blockId={blockId}
				note={note}
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
			/>
		</>
	);
}
