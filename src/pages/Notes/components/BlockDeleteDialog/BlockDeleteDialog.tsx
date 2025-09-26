import { Dialog, Text } from "@gravity-ui/uikit";
import type { Dispatch, SetStateAction } from "react";
import { useBlocksStore } from "../../../../store/useBlocks";
import type { BlockType } from "../../types/Block";
import classes from "./BlockDeleteDialog.module.css";

type Props = {
	block: BlockType;
	isDialogOpen: boolean;
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function BlockDeleteDialog({
	block,
	isDialogOpen,
	setIsDialogOpen,
}: Props) {
	const { removeBlock } = useBlocksStore();

	return (
		<Dialog
			className={classes.dialog}
			onClose={() => setIsDialogOpen(false)}
			open={isDialogOpen}
			onEnterKeyDown={() => removeBlock(block.id)}
		>
			<Dialog.Header
				className={classes.dialogHeader}
				caption={
					<Text variant="body-3" color="warning">
						Вы уверены, что хотит УДАЛИТЬ блок «{block.name}»?
					</Text>
				}
			/>
			<Dialog.Body>
				<Text variant="body-2" className={classes.dialogText}>
					Это действие нельзя отменить. Все данные внутри блока будут
					удалены без возможности восстановления.
				</Text>
			</Dialog.Body>
			<Dialog.Footer
				onClickButtonCancel={() => setIsDialogOpen(false)}
				onClickButtonApply={() => removeBlock(block.id)}
				textButtonApply="Удалить"
				textButtonCancel="Отмена"
			/>
		</Dialog>
	);
}
