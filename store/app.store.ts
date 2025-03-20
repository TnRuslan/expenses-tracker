import { Expense, UpdateExpensesParams } from '@/types/expenses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AppStoreState = {
	balance: number;
	expenses: Expense[];
};

export type AppStoreActions = {
	setExpenses: (expenses: Expense[]) => void;
	setBalance: (balance: number) => void;
	addExpense: (expense: Expense) => void;
	removeExpense: (id: number) => void;
	updateExpense: (newExpense: Expense) => void;
};

const initialState: AppStoreState = {
	balance: 0,
	expenses: [],
};

export const useAppStore = create(
	persist<AppStoreState & AppStoreActions>(
		(set) => ({
			...initialState,
			setExpenses: (expenses) =>
				set(() => ({
					expenses: [...expenses],
				})),
			setBalance: (balance) =>
				set(() => ({
					balance: balance,
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
		}),
		{
			name: 'application-store',
			storage: createJSONStorage(() => AsyncStorage),
			// onRehydrateStorage: (state) => {
			// 	return () => state.setHasHydrated(true);
			// },
		},
	),
);
