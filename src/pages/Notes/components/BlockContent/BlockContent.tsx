import { Plus } from "@gravity-ui/icons";
import { Button, Flex, Icon, Text } from "@gravity-ui/uikit";
import { useBlocksStore } from "../../../../store/useBlocks";
import type { BlockType } from "../../types/Block";
import NoteCard from "../NoteCard/NoteCard";

type Props = {
	block: BlockType;
};

export default function BlockContent({ block }: Props) {
	const { addEmptyNote } = useBlocksStore();

	return (
		<>
			<Flex direction="column" gap={2}>
				{block.notes.map((note) => (
					<NoteCard key={note.id} blockId={block.id} note={note} />
				))}
			</Flex>

			<Button
				view="flat"
				onClick={() => {
					addEmptyNote(block.id);
				}}
			>
				<Icon data={Plus} />
				<Text>Добавить карточку</Text>
			</Button>
		</>
	);
}
