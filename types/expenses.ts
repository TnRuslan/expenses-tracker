export type Expense = {
	id: number;
	title: string;
	amount: number;
	category: ExpenseCategory;
	date: string;
};

export type UpdateExpensesParams = Omit<Expense, 'id'>;

export enum ExpenseCategory {
	FOOD = 'Food',
	TRANSPORT = 'Transport',
	ENTERTAINMENT = 'Entertainment',
	HEALTH = 'Health',
	SHOPPING = 'Shopping',
	HOUSING = 'Housing',
	UTILITIES = 'Utilities',
	EDUCATION = 'Education',
	TRAVEL = 'Travel',
	OTHER = 'Other',
}
