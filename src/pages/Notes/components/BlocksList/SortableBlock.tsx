import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { BlockType } from "../../types/Block";
import Block from "../Block/Block";

type Props = {
	block: BlockType;
};

export default function SortableBlock({ block }: Props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: block.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Block block={block} />
		</div>
	);
}
