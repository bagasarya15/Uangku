import dayjs from "dayjs";

const renderExpenseDateTime = (expense_datetime) => {
	const formattedDate = dayjs(expense_datetime).format("YYYY-MM-DD HH:mm:ss");

	return formattedDate;
};
