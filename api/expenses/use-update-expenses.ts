import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { Expense } from '@/types/expenses';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useUpdateBalance } from '../balance/use-update-balances';

export const updateExpenses = async ({
	id,
	previousAmount,
	...expense
}: Partial<Expense> & { previousAmount: number }): Promise<Expense> => {
	const { data, error } = await supabase
		.from('expenses')
		.update(expense)
		.eq('id', id)
		.select('*')
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useUpdateExpenses = () => {
	const { mutate } = useUpdateBalance();
	const { updateExpense, updateBalance, accounts, getAccountById } =
		useAppStore();
	return useMutation({
		mutationFn: updateExpenses,
		onSuccess: (data, { previousAmount }) => {
			if (data) {
				const { amount, account_id } = data;

				updateExpense(data);
				updateBalance(amount, account_id, previousAmount);
				const account = getAccountById(account_id);
				const updatedBalance = accounts[0]?.balance ?? 0;

				if (account) {
					mutate({
						...account,
						balance: updatedBalance + previousAmount - amount,
					});
				}
			}

			console.log('Updated expense success');
		},
		onError: (err: Error) => {
			Alert.alert('Updating Failed', err.message);
		},
	});
};
