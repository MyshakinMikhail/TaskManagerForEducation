import { ArrowShapeRightToLine, TrashBin } from "@gravity-ui/icons";
import { Button, Flex, Icon } from "@gravity-ui/uikit";
import { useState } from "react";
import type { BlockType } from "../../types/Block";
import BlockDeleteDialog from "../BlockDeleteDialog/BlockDeleteDialog";
import BlockName from "../BlockName/BlockName";
import classes from "./BlockHeader.module.css";

type Props = {
	block: BlockType;
};

export default function BlockHeader({ block }: Props) {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const handleRemoveBlock = () => {
		setIsDialogOpen(true);
	};

	return (
		<>
			<BlockDeleteDialog
				block={block}
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
			/>
			<Flex
				className={classes.header}
				justifyContent="space-between"
				alignItems="center"
			>
				<BlockName block={block} />

				<Flex gap={2}>
					<Button view="flat">
						<Icon
							className={classes.icon}
							data={ArrowShapeRightToLine}
						/>
					</Button>
					<Button view="flat" onClick={() => handleRemoveBlock()}>
						<Icon data={TrashBin} />
					</Button>
				</Flex>
			</Flex>
		</>
	);
}
