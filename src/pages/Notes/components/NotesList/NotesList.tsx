import { Flex } from "@gravity-ui/uikit";
import type { BlockType } from "../../types/Block";
import NoteCard from "../NoteCard/NoteCard";

type Props = {
	block: BlockType;
};

export default function NotesList({ block }: Props) {
	return (
		<Flex direction="column" gap={2}>
			{block.notes.map((note) => (
				<NoteCard key={note.id} blockId={block.id} note={note} />
			))}
		</Flex>
	);
}
