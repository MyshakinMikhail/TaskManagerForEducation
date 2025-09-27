import { createContext } from "react";
import type { BlockType } from "../../pages/Notes/types/Block";

type FilterContextType = {
	filter: string[];
	setFilter: (filter: string[]) => void;
	filteredBlocks: BlockType[];
};

export const FilterContext = createContext<FilterContextType | undefined>(
	undefined
);
