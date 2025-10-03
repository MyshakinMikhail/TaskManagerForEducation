import { Plus } from "@gravity-ui/icons";
import { Button, Flex, Icon, Text } from "@gravity-ui/uikit";
import { useDispatch } from "react-redux";
import { addEmptyNote } from "../../../../store/blocks/blocksReduser";
import type { BlockType } from "../../types/Block";
import NoteCard from "../NoteCard/NoteCard";
import classes from "./BlockContent.module.css";

type Props = {
	block: BlockType;
};

export default function BlockContent({ block }: Props) {
	const dispatch = useDispatch();

	return (
		<Flex
			className={classes.block}
			direction="column"
			gap={2}
			alignItems="center"
		>
			{block.notes.length === 0 && (
				<Text variant="body-2">У вас пока не заметок</Text>
			)}

			<Flex direction="column" gap={2}>
				{block.notes.map((note) => (
					<NoteCard key={note.id} blockId={block.id} note={note} />
				))}
			</Flex>

			<Button
				className={classes.button}
				view="flat"
				onClick={() => {
					dispatch(addEmptyNote({ blockId: block.id }));
				}}
			>
				<Icon data={Plus} />
				<Text>Добавить заметку</Text>
			</Button>
		</Flex>
	);
}
