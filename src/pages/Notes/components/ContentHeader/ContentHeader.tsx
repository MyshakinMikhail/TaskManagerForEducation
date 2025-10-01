import { Button, Flex, Select } from "@gravity-ui/uikit";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { useFilter } from "../../../../context/Filter/useFilter";
import { addEmptyBlock } from "../../../../store/blocksReduser";
import classes from "./ContentHeader.module.css";

function ContentHeader() {
	const dispatch = useDispatch();
	const { filter, setFilter } = useFilter();

	return (
		<Flex
			className={classes.contentHeader}
			justifyContent="center"
			alignItems="center"
			gap={3}
		>
			<Button view="action" onClick={() => dispatch(addEmptyBlock())}>
				Добавить блок
			</Button>
			<Select
				placeholder="Фильтровать по статусу"
				value={filter}
				onUpdate={(status) => setFilter(status)}
				multiple
				hasClear
			>
				<Select.Option value="completed">Выполнено</Select.Option>
				<Select.Option value="in-progress">В процессе</Select.Option>
				<Select.Option value="overdue">Просрочено</Select.Option>
			</Select>
		</Flex>
	);
}

export default memo(ContentHeader);
