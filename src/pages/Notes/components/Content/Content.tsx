import { Flex, Text } from "@gravity-ui/uikit";
import { useEffect } from "react";
import { FilterProvider } from "../../../../context/Filter/FilterProvider";
import { useBlocksStore } from "../../../../store/useBlocks";
import BlocksList from "../BlocksList/BlocksList";
import ContentHeader from "../ContentHeader/ContentHeader";
import classes from "./Content.module.css";

export default function Content() {
	const { blocks, initialBlocks } = useBlocksStore();

	useEffect(() => {
		initialBlocks();
	}, []);

	return (
		<FilterProvider blocks={blocks}>
			<Flex
				className={classes.content}
				direction="column"
				alignContent="center"
				gap={2}
			>
				<ContentHeader />
				{blocks.length === 0 && (
					<Flex justifyContent="center">
						<Text variant="body-3">Добавьте первую заметку</Text>
					</Flex>
				)}
				<BlocksList />
			</Flex>
		</FilterProvider>
	);
}
