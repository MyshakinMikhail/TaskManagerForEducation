import { Flex } from "@gravity-ui/uikit";
import { useEffect } from "react";
import { useBlocksStore } from "../../../../store/useBlocks";
import Block from "../Block/Block";
import ContentHeader from "../ContentHeader/ContentHeader";
import classes from "./Content.module.css";

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
