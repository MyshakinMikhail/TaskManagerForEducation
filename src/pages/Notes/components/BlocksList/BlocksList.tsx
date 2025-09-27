import { Flex } from "@gravity-ui/uikit";
import { useFilter } from "../../../../context/Filter/useFilter";
import Block from "../Block/Block";
import classes from "./BlocksList.module.css";

export default function BlocksList() {
	const { filteredBlocks } = useFilter();

	return (
		<Flex className={classes.blocks} gap={5}>
			{filteredBlocks.map((block) => (
				<Block key={block.id} block={block} />
			))}
		</Flex>
	);
}
