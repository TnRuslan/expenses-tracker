import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useUpdateBalance } from '../balance/use-update-balances';
import { Expense } from '@/types/expenses';

export const deleteExpenses = async (params: Expense) => {
	const { error } = await supabase
		.from('expenses')
		.delete()
		.eq('id', params.id);

	if (error) {
		throw new Error(error.message);
	}

	return params;
};

export const useDeleteExpenses = () => {
	const { mutate } = useUpdateBalance();
	const { removeExpense, addToBalance, getAccountById } = useAppStore();
	return useMutation({
		mutationFn: deleteExpenses,
		onSuccess: (_, { id, amount, account_id }) => {
			console.log('Delete expense success');
			removeExpense(id);
			addToBalance(amount, account_id);

			const updatedBalance = getAccountById(account_id)?.balance ?? 0;

			mutate({ id: account_id, balance: updatedBalance + amount });
		},
		onError: (err: Error) => {
			Alert.alert('Deleting Failed', err.message);
		},
	});
};
