import { Flex, Text } from "@gravity-ui/uikit";
import classes from "./AsideHeader.module.css";

export default function AsideHeader() {
	return (
		<Flex className={classes.asideHeader} justifyContent="center">
			<Text variant="body-2">AsideHeader</Text>
		</Flex>
	);
}
