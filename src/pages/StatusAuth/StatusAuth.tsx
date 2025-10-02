import { Card, Flex, Text } from "@gravity-ui/uikit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/user";
import { useAuth } from "../../context/Auth/useAuth";
import classes from "./StatusAuth.module.css";

export default function StatusAuthPage() {
	const { handleCallback, loading, user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		async function processAuth() {
			handleCallback();
			const currentUser = userApi.get();
			if (currentUser) {
				setTimeout(() => {
					navigate("/", { replace: true });
				}, 2000);
			} else {
				navigate("/auth", { replace: true });
			}
		}

		processAuth();
	}, [handleCallback, navigate]);

	return (
		<Flex
			className={classes.statusAuth}
			justifyContent="center"
			alignItems="center"
			style={{ height: "100vh" }}
		>
			<Card className={classes.card}>
				{loading && (
					<Flex direction="column" gap={2} alignItems="center">
						<Text>Авторизация через Яндекс...</Text>
					</Flex>
				)}
				{!loading && user && (
					<Text>
						Вы успешно авторизованы! Добро пожаловать,{" "}
						{user.firstName} {user.lastName}.
					</Text>
				)}
				{!loading && !user && (
					<Text>
						Не удалось авторизоваться. Перенаправляем на вход...
					</Text>
				)}
			</Card>
		</Flex>
	);
}
