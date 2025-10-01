import { Flex, Text } from "@gravity-ui/uikit";
import { useSelector } from "react-redux";
import { FilterProvider } from "../../../../context/Filter/FilterProvider";
import BlocksList from "../BlocksList/BlocksList";
import ContentHeader from "../ContentHeader/ContentHeader";
import type { RootState } from "./../../../../store";
import classes from "./Content.module.css";

export default function Content() {
	const blocks = useSelector((state: RootState) => state.blocks.blocks);

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
