import { Button, Card, Flex, Icon, Label, Text } from "@gravity-ui/uikit";
import { CircleCheck, Plus } from "@gravity-ui/icons";
import classes from "./NoteCard.module.css";

export default function NoteCard() {
	return (
		<Card className={classes.noteCard}>
			<Flex alignItems="center" gap={3}>
				<Icon className={classes.icon} data={CircleCheck} />
				<Label theme="success">Статус</Label>
			</Flex>
			<Text>Описание заметки</Text>
			<Text>Дата</Text>
			{/* <DatePicker placeholder="Выберите дату" /> */}

			<Flex alignItems="center" gap={2}>
				<Button view="flat">
					<Icon data={Plus} />
				</Button>
				<Text>Добавить карточку</Text>
			</Flex>
		</Card>
	);
}
