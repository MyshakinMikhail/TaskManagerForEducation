import { createContext } from "react";

type ModalContextType = {
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
	undefined
);
