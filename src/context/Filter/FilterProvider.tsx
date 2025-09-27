// context/FilterContext.tsx — компонент провайдера
import { type ReactNode, useMemo, useState } from "react";
import type { BlockType } from "../../pages/Notes/types/Block";
import { FilterContext } from "./FilterContext";

type Props = {
	children: ReactNode;
	blocks: BlockType[];
};

export const FilterProvider = ({ children, blocks }: Props) => {
	const [filter, setFilter] = useState<string[]>([]);
	const filteredBlocks = useMemo(() => {
		if (filter.length === 0) return blocks;
		return blocks.map((block) => ({
			...block,
			notes: block.notes.filter((note) => filter.includes(note.status)),
		}));
	}, [blocks, filter]);

	return (
		<FilterContext.Provider value={{ filter, setFilter, filteredBlocks }}>
			{children}
		</FilterContext.Provider>
	);
};
