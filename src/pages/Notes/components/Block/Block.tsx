import { Card } from "@gravity-ui/uikit";
import type { BlockType } from "../../types/Block";
import BlockContent from "../BlockContent/BlockContent";
import BlockHeader from "../BlockHeader/BlockHeader";
import classes from "./Block.module.css";

type Props = {
	block: BlockType;
};

export default function Block({ block }: Props) {
	return (
		<Card className={classes.block}>
			<BlockHeader block={block} />
			<BlockContent block={block} />
		</Card>
	);
}
