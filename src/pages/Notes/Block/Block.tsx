import { Button, Card, Flex, Icon, Text } from "@gravity-ui/uikit";
import { ArrowShapeRightToLine, Ellipsis } from "@gravity-ui/icons";
import classes from "./Block.module.css";
import NoteCard from "../NoteCard/NoteCard";

export default function Block() {
	return (
		<Card className={classes.block}>
			{/* Block Header */}
			<Flex
				className={classes.header}
				justifyContent="space-between"
				alignItems="center"
			>
				<Text>Название группы</Text>
				<Flex gap={2}>
					<Button view="flat">
						<Icon
							className={classes.icon}
							data={ArrowShapeRightToLine}
						/>
					</Button>
					<Button view="flat">
						<Icon data={Ellipsis} />
					</Button>
				</Flex>
			</Flex>

			{/* Block Content */}
			<Flex direction="column" gap={2}>
				<NoteCard />
				<NoteCard />
				<NoteCard />
			</Flex>
		</Card>
	);
}
