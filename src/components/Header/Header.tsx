import { Flex, Text } from "@gravity-ui/uikit";
import classes from "./Header.module.css";

export default function Header() {
	return (
		<Flex
			className={classes.header}
			justifyContent="space-between"
			alignItems="center"
		>
			<Text variant="body-2">Icon + AppName</Text>
			<Text variant="body-2">Info</Text>
			<Text variant="body-2">Profile</Text>
		</Flex>
	);
}
