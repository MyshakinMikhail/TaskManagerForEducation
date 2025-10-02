import { Button, Flex, Text } from "@gravity-ui/uikit";
import { useAuth } from "../../context/Auth/useAuth";
import classes from "./Header.module.css";

export default function Header() {
	const { logout, user } = useAuth();

	return (
		<Flex
			className={classes.header}
			justifyContent="space-between"
			alignItems="center"
		>
			<Text variant="body-2">Icon + AppName</Text>
			<Text variant="body-2">Info</Text>
			<Flex gap={2} alignItems="center">
				<Text variant="body-2">
					{user?.firstName} {user?.lastName}
				</Text>
				<Button view="action" onClick={logout}>
					Выйти
				</Button>
			</Flex>
		</Flex>
	);
}
