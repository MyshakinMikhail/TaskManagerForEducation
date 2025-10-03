import { Button, Card, Flex, Text } from "@gravity-ui/uikit";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { login } from "../../store/auth/authThunks";
import classes from "./Auth.module.css";

export default function AuthPage() {
	const { loading } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<Flex
			className={classes.auth}
			justifyContent="center"
			alignItems="center"
		>
			<Card className={classes.card}>
				<Text>Вход через Яндекс ID</Text>
				<Button
					onClick={() => {
						dispatch(login());
					}}
				>
					Войти через Яндекс
				</Button>
				{loading && <Text>Авторизация...</Text>}
			</Card>
		</Flex>
	);
}
