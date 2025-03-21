import { Balance, BalanceActionType } from './balances';
import { Expense } from './expenses';

export type AppStoreState = {
	activeBalance: number | null;
	accounts: Balance[];
	expenses: Expense[];
};

export type AppStoreActions = {
	setExpenses: (expenses: Expense[]) => void;
	setBalance: (balance: Balance[]) => void;
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
};
