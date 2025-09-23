import { Button } from "@gravity-ui/uikit";
import AsideHeader from "../../components/AsideHeader/AsideHeader";
import Footer from "../../components/Footer/Footer";

export default function NotesPage() {
	return (
		<>
			<AsideHeader />
			<div> Notes Page </div>
			<Button view="action" size="l">
				click me
			</Button>
			<Footer />
		</>
	);
}
