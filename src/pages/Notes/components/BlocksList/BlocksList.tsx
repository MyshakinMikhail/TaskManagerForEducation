import {
	closestCenter,
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Flex } from "@gravity-ui/uikit";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import type { BlockType } from "../../types/Block";
import SortableBlock from "./SortableBlock";

import { useFilter } from "../../../../context/Filter/useFilter";
import { useModal } from "../../../../context/Modal/useModal";
import { handleDragEnd } from "../../../../store/blocks/blocksReduser";
import classes from "./BlocksList.module.css";

export default function BlocksList() {
	const dispatch = useDispatch();
	const { filteredBlocks } = useFilter();
	const { isModalOpen } = useModal();

	const [blocks, setBlocks] = useState<BlockType[]>(filteredBlocks);

	useEffect(() => {
		setBlocks(filteredBlocks);
	}, [filteredBlocks]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 },
		})
	);

	return (
		<DndContext
			sensors={isModalOpen ? [] : sensors}
			collisionDetection={closestCenter}
			onDragEnd={(event) => dispatch(handleDragEnd(event))}
		>
			<SortableContext
				items={blocks.map((b) => b.id)}
				strategy={verticalListSortingStrategy}
			>
				<Flex className={classes.blocks} gap={5}>
					{blocks.map((block) => (
						<SortableBlock key={block.id} block={block} />
					))}
				</Flex>
			</SortableContext>
		</DndContext>
	);
}
