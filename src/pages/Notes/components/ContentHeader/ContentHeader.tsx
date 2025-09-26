import { Button, Flex } from "@gravity-ui/uikit";
import classes from "./ContentHeader.module.css";
import { useBlocksStore } from "../../../../store/useBlocks";

export default function ContentHeader() {
	const { addEmptyBlock } = useBlocksStore();

	return (
		<Flex
			className={classes.contentHeader}
			justifyContent="center"
			alignItems="center"
		>
			<Button view="action" onClick={() => addEmptyBlock()}>
				Добавить блок
			</Button>
		</Flex>
	);
}
