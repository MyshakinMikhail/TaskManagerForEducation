import { Flex } from "@gravity-ui/uikit";
import AsideHeader from "../../components/AsideHeader/AsideHeader";
import Header from "../../components/Header/Header";
import Content from "./Content/Content";
import classes from "./Notes.module.css";

export default function NotesPage() {
	return (
		<Flex className={classes.page} direction="column" gap={4}>
			<Header />
			<Flex direction="row" className={classes.container} gap={4}>
				<AsideHeader />
				<Content />
			</Flex>
		</Flex>
	);
}
