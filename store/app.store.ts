import { BalanceActionType } from '@/types/balances';
import { AppStoreActions, AppStoreState } from '@/types/store';
import { handleBalanceUpdate } from '@/utils/balance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState: AppStoreState = {
	activeBalance: null,
	accounts: [],
	expenses: [],
};

export const useAppStore = create(
	persist<AppStoreState & AppStoreActions>(
		(set, get) => ({
			...initialState,
			setExpenses: (expenses) =>
				set(() => ({
					expenses: [...expenses],
				})),
			setBalance: (accounts) =>
				set(() => ({
					accounts: [...accounts],
				})),
			updateAccount: (newAccount) =>
				set((state) => ({
					accounts: state.accounts.map((acc) =>
						acc.id === newAccount.id ? newAccount : acc,
					),
				})),
			addAccount: (newAccount) =>
				set((state) => ({
					accounts: [newAccount, ...state.accounts],
				})),
			removeAccount: (account_id) =>
				set((state) => ({
					accounts: state.accounts.filter((acc) => acc.id !== account_id),
				})),
			addToBalance: (amount, account_id) =>
				set((state) => ({
					accounts: state.accounts.map((acc) =>
						acc.id === account_id
							? {
									...acc,
									balance: handleBalanceUpdate({
										action: BalanceActionType.ADD,
										balance: acc.balance,
										amount,
									}),
							  }
							: acc,
					),
				})),
			subtractToBalance: (amount, account_id) =>
				set((state) => ({
					accounts: state.accounts.map((acc) =>
						acc.id === account_id
							? {
									...acc,
									balance: handleBalanceUpdate({
										action: BalanceActionType.SUBTRACT,
										balance: acc.balance,
										amount,
									}),
							  }
							: acc,
					),
				})),
			updateBalance: (amount, account_id, previousAmount = 0) =>
				set((state) => ({
					accounts: state.accounts.map((acc) =>
						acc.id === account_id
							? {
									...acc,
									balance: handleBalanceUpdate({
										action: BalanceActionType.UPDATE,
										balance: acc.balance,
										amount,
										previousAmount,
									}),
							  }
							: acc,
					),
				})),
			addExpense: (expense) =>
				set((state) => ({
					expenses: [expense, ...state.expenses],
				})),
			updateExpense: (newExpense) =>
				set((state) => ({
					expenses: state.expenses.map((expense) =>
						expense.id === newExpense.id ? newExpense : expense,
					),
				})),
			removeExpense: (id) =>
				set((state) => ({
					expenses: state.expenses.filter((el) => el.id !== id),
				})),
			getExpensesByAccountId: (id) =>
				get().expenses.filter((expense) => expense.account_id === id),
			getAccountById: (id) => get().accounts.find((acc) => acc.id === id),
			getExpensesTotalByCategory: (category) =>
				get()
					.expenses.filter((expense) => expense.category === category)
					.reduce((acc, expense) => {
						return (acc += expense.amount);
					}, 0),
		}),

		{
			name: 'application-store',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
