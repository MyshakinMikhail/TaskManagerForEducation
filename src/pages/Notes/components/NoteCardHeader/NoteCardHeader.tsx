import { CircleCheck, PencilToSquare, Xmark } from "@gravity-ui/icons";
import { Button, Flex, Icon, Label } from "@gravity-ui/uikit";
import { type Dispatch, type SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../../../store/blocks/blocksReduser";
import { getConvertedStatus } from "../../../../utils/getConvertedStatus";
import { getStatusColor } from "../../../../utils/getStatusColor";
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
	const dispatch = useDispatch();
	const statusTheme = getStatusColor(note.status);

	return (
		<Flex justifyContent="space-between" alignItems="center">
			<Flex alignItems="center" gap={3}>
				<Button
					view="flat"
					onClick={(e) => {
						e.stopPropagation();
						dispatch(changeStatus({ blockId, selectedNote: note }));
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
