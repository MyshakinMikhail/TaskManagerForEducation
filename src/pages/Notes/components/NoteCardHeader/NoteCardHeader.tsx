import { CircleCheck, PencilToSquare, Xmark } from "@gravity-ui/icons";
import { Button, Flex, Icon, Label } from "@gravity-ui/uikit";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useBlocksStore } from "../../../../store/useBlocks";
import { getConvertedStatus } from "../../../../utils/getConvertedStatus";
import { getStatusColor } from "../../../../utils/getStatusColor";
import type { NoteStatusType } from "../../types/NoteStatus";
import type { ShortNoteType } from "../../types/ShortNoteType";
import classes from "./NoteCardHeader.module.css";

type Props = {
	blockId: string;
	note: ShortNoteType;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function NoteCardHeader({
	blockId,
	note,
	setOpen,
	setIsDialogOpen,
}: Props) {
	const { changeStatus, updateNoteStatus } = useBlocksStore();
	const [status, setStatus] = useState<NoteStatusType>(note.status);
	const statusTheme = getStatusColor(status);

	useEffect(() => {
		setStatus(updateNoteStatus(blockId, note));
	}, [updateNoteStatus, blockId, note]);

	return (
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
						className={
							note.status === "completed" ? classes.icon : ""
						}
						data={CircleCheck}
					/>
				</Button>
				<Label theme={statusTheme}>
					{getConvertedStatus(note.status)}
				</Label>
			</Flex>
			<Flex>
				<Button
					view="flat"
					onClick={() => {
						setOpen(true);
					}}
				>
					<Icon data={PencilToSquare} />
				</Button>
				<Button
					view="flat"
					onClick={(e) => {
						e.stopPropagation();
						setIsDialogOpen(true);
					}}
				>
					<Icon data={Xmark} />
				</Button>
			</Flex>
		</Flex>
	);
}
