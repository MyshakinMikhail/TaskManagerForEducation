import { Check, PencilToLine } from "@gravity-ui/icons";
import { Button, Flex, Icon, Text, TextInput } from "@gravity-ui/uikit";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNameBlock } from "../../../../store/blocksReduser";
import type { BlockType } from "../../types/Block";

type Props = {
	block: BlockType;
};

export default function BlockName({ block }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [blockName, setBlockName] = useState<string>(block.name);
	const [isEditingName, setIsEditingName] = useState<boolean>(false);
	const dispatch = useDispatch();

	const saveBlockName = () => {
		dispatch(updateNameBlock({ blockId: block.id, blockName }));
		setIsEditingName(false);
	};

	useEffect(() => {
		if (isEditingName) {
			inputRef.current?.focus();
		}
	}, [isEditingName]);

	return isEditingName ? (
		<Flex>
			<TextInput
				view="clear"
				value={blockName}
				controlRef={inputRef}
				onChange={(e) => setBlockName(e.target.value)}
				onBlur={() => {
					saveBlockName();
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						saveBlockName();
					}
				}}
			/>
			<Button
				view="flat"
				onClick={() => {
					saveBlockName();
				}}
			>
				<Icon data={Check} />
			</Button>
		</Flex>
	) : (
		<Flex alignItems="center" gap={2}>
			<Text>{blockName}</Text>
			<Button view="flat" onClick={() => setIsEditingName(true)}>
				<Icon data={PencilToLine} />
			</Button>
		</Flex>
	);
}
