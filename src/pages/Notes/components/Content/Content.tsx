import { Flex } from "@gravity-ui/uikit";
import classes from "./Content.module.css";
import Block from "../Block/Block";
import { useBlocksStore } from "../../../../store/useBlocks";
import { useEffect } from "react";
import ContentHeader from "../ContentHeader/ContentHeader";

export default function Content() {
	const { blocks, initialBlocks } = useBlocksStore();

	useEffect(() => {
		initialBlocks();
	}, [initialBlocks]);

	return (
		<Flex
			className={classes.content}
			direction="column"
			alignContent="center"
		>
			<ContentHeader />
			<Flex className={classes.blocks} gap={5}>
				{blocks.map((block) => (
					<Block key={block.id} block={block} />
				))}
			</Flex>
		</Flex>
	);
}
