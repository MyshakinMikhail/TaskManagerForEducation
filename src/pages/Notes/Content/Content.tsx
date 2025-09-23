import { Flex } from "@gravity-ui/uikit";
import classes from "./Content.module.css";
import ContentHeader from "./ContentHeader/ContentHeader";
import Block from "../Block/Block";

export default function Content() {
	return (
		<Flex
			className={classes.content}
			direction="column"
			alignContent="center"
		>
			<ContentHeader />
			<Flex className={classes.blocks} gap={5}>
				<Block />
				<Block />
				<Block />
			</Flex>
		</Flex>
	);
}
