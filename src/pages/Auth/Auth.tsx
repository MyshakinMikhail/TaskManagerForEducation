import { Button, Card, Flex, Text } from "@gravity-ui/uikit";
import { useAuth } from "../../context/Auth/useAuth";
import classes from "./Auth.module.css";

export default function AuthPage() {
	const { login, loading } = useAuth();

	return (
		<Flex
			className={classes.auth}
			justifyContent="center"
			alignItems="center"
		>
			<Card className={classes.card}>
				<Text>Вход через Яндекс ID</Text>
				<Button onClick={login}>Войти через Яндекс</Button>
				{loading && <Text>Авторизация...</Text>}
			</Card>
		</Flex>
	);
}
