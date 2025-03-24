import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useUpdateBalance } from '../balance/use-update-balances';

export const deleteExpenses = async (params: {
	id: number;
	amount: number;
}) => {
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
	const { removeExpense, addToBalance, accounts } = useAppStore();
	return useMutation({
		mutationFn: deleteExpenses,
		onSuccess: (_, { id, amount }) => {
			console.log('Delete expense success');
			removeExpense(id);
			addToBalance(amount, 2);

			const updatedBalance = accounts[0].balance;

			mutate({ id: 2, balance: updatedBalance + amount });
		},
		onError: (err: Error) => {
			Alert.alert('Deleting Failed', err.message);
		},
	});
};
