export type Expense = {
	title: string;
	amount: number;
	category: string;
	date: string;
};

export type UpdateExpensesParams = Partial<Expense> & {
	id: number;
};
