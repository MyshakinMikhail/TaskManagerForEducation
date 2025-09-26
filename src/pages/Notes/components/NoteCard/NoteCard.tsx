import { CircleCheck, Xmark } from "@gravity-ui/icons";

import {
	Button,
	Card,
	Flex,
	Icon,
	Label,
	Modal,
	Text,
} from "@gravity-ui/uikit";
import { useState } from "react";
import { useBlocksStore } from "../../../../store/useBlocks";
import { getStatusColor } from "../../../../utils/getStatusColor";
import type { ShortNoteType } from "../../types/ShortNoteType";
import NoteDeleteDialog from "../NoteDeleteDialog/NoteDeleteDialog";
import NoteModal from "../NoteModal/NoteModal";
import { formatDateToReadable } from "./../../../../utils/getFormattedDate";
import classes from "./NoteCard.module.css";
type Props = {
	blockId: string;
	note: ShortNoteType;
};
export default function NoteCard({ blockId, note }: Props) {
	const { changeStatus, updateNoteStatus } = useBlocksStore();
	const status = updateNoteStatus(blockId, note);
	const statusTheme = getStatusColor(status);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<NoteDeleteDialog
				blockId={blockId}
				note={note}
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
			/>
			<Flex
				onClick={() => {
					setOpen(true);
				}}
			>
				<Card className={classes.noteCard}>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center" gap={3}>
							<Button
								view="flat"
								onClick={(e) => {
									e.stopPropagation();
									changeStatus(blockId, note);
								}}
							>
								<Icon
									className={classes.icon}
									data={CircleCheck}
								/>
							</Button>
							<Label theme={statusTheme}>{note.status}</Label>
						</Flex>
						<Button
							view="flat"
							onClick={(e) => {
								e.stopPropagation();
								setIsDialogOpen(true);
							}}
						>
							<Icon className={classes.icon} data={Xmark} />
						</Button>
					</Flex>
					<Text>{note.description}</Text>
					<Text color="warning">
						Дедлайн: {formatDateToReadable(note.date)}
					</Text>
					{/* <DatePicker /> */}
				</Card>
			</Flex>

			<Modal open={open} onOpenChange={() => setOpen(false)}>
				<NoteModal blockId={blockId} note={note} setOpen={setOpen} />
			</Modal>
		</>
	);
}
