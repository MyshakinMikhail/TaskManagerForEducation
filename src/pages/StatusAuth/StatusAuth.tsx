import { Card, Flex, Text } from "@gravity-ui/uikit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { handleCallback } from "../../store/auth/authThunks";
import classes from "./StatusAuth.module.css";

export default function StatusAuthPage() {
	const { user, loading } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		async function processAuth() {
			const resultAction = await dispatch(handleCallback());
			if (handleCallback.fulfilled.match(resultAction)) {
				navigate("/", { replace: true });
			} else {
				navigate("/auth", { replace: true });
			}
		}
		processAuth();
	}, [dispatch, navigate]);

	useEffect(() => {
		if (user) {
			navigate("/statusAuth", { replace: true });
		}
	}, [user, navigate]);

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
