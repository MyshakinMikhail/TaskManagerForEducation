import { useState, type ReactNode } from "react";
import { ModalContext } from "./ModalContext";

type Props = {
	children: ReactNode;
};

export default function ModalProvider({ children }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
			{children}
		</ModalContext.Provider>
	);
}
