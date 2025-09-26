import { Button, Flex } from "@gravity-ui/uikit";
import { useBlocksStore } from "../../../../store/useBlocks";
import classes from "./ContentHeader.module.css";

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
