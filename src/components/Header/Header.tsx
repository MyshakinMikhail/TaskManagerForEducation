import { Button, Flex, Text } from "@gravity-ui/uikit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { logout } from "../../store/auth/authReducer";
import classes from "./Header.module.css";

export default function Header() {
	const { user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

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
				<Button
					view="action"
					onClick={() => {
						dispatch(logout());
						navigate("/auth");
					}}
				>
					Выйти
				</Button>
			</Flex>
		</Flex>
	);
}
