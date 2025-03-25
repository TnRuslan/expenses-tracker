import { Balance } from './balances';
import { Expense, ExpenseCategory } from './expenses';

export type AppStoreState = {
	activeBalance: number | null;
	accounts: Balance[];
	expenses: Expense[];
};

export type AppStoreActions = {
	setExpenses: (expenses: Expense[]) => void;
	setBalance: (balance: Balance[]) => void;
	addAccount: (newAccount: Balance) => void;
	removeAccount: (account_id: number) => void;
	updateAccount: (newAccount: Balance) => void;
	addExpense: (expense: Expense) => void;
	removeExpense: (id: number) => void;
	updateExpense: (newExpense: Expense) => void;
	updateBalance: (
		amount: number,
		account_id: number,
		previousAmount: number,
	) => void;
	addToBalance: (amount: number, account_id: number) => void;
	subtractToBalance: (amount: number, account_id: number) => void;
	getExpensesByAccountId: (accountId: number) => Expense[];
	getAccountById: (id: number) => Balance | undefined;
	getExpensesTotalByCategory: (category: ExpenseCategory | '') => number;
};
