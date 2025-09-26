import { Calendar, TextAlignLeft } from "@gravity-ui/icons";
import { Button, Flex, Icon, Text, TextInput } from "@gravity-ui/uikit";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useBlocksStore } from "../../../../store/useBlocks";
import { formatDateToReadable } from "../../../../utils/getFormattedDate";
import type { ShortNoteType } from "../../types/ShortNoteType";
import classes from "./NoteModal.module.css";

type Props = {
	blockId: string;
	note: ShortNoteType;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function NoteModal({ blockId, note, setOpen }: Props) {
	const [description, setDescription] = useState<string>(note.description);
	const [date, setDate] = useState<string>(formatDateToReadable(note.date));
	const [isEdited, setIsEdited] = useState<boolean>(false);
	console.log(note.date);

	const { updateNote } = useBlocksStore();

	useEffect(() => {
		if (
			note.description !== description ||
			formatDateToReadable(note.date) !== date
		) {
			setIsEdited(true);
		} else {
			setIsEdited(false);
		}
	}, [note.description, description, setIsEdited, note.date, date]);

	return (
		<Flex className={classes.noteModal} direction="column" gap={3}>
			<Flex direction="column" gap={1}>
				<Flex justifyContent="space-between">
					<Flex gap={3}>
						<Icon data={TextAlignLeft} />
						<Text>Описание</Text>
					</Flex>
					{isEdited && (
						<Text color="warning">
							У вас остались не сохраненные изменения
						</Text>
					)}
				</Flex>
				<TextInput
					value={description}
					placeholder="Введите описание"
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</Flex>

			<Flex direction="column" gap={1}>
				<Flex gap={3}>
					<Icon data={Calendar} />
					<Text>Дедлайн</Text>
				</Flex>
				<TextInput
					value={date}
					onChange={(e) => {
						setDate(e.target.value);
					}}
				/>
			</Flex>

			<Flex justifyContent="end" gap={3}>
				<Button
					view="flat"
					onClick={() => {
						setOpen(false);
					}}
				>
					Отменить
				</Button>
				<Button
					view="action"
					onClick={() => {
						updateNote(blockId, { ...note, description, date });
						setOpen(false);
					}}
				>
					Сохранить
				</Button>
			</Flex>
		</Flex>
	);
}
