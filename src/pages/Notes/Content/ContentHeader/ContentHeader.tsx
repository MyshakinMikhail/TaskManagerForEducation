import { Flex, Text } from "@gravity-ui/uikit";
import classes from "./ContentHeader.module.css";

export default function ContentHeader() {
	return (
		<Flex className={classes.contentHeader}>
			<Text variant="body-2">ContentHeader</Text>
		</Flex>
	);
}
