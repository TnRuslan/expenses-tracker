import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { Expense } from '@/types/expenses';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const updateExpenses = async ({
	id,
	previousAmount,
	...expense
}: Partial<Expense> & { previousAmount: number }) => {
	const { data, error } = await supabase
		.from('expenses')
		.update(expense)
		.eq('id', id)
		.select('*');

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useUpdateExpenses = () => {
	const { updateExpense, updateBalance } = useAppStore();
	return useMutation({
		mutationFn: updateExpenses,
		onSuccess: (data, { previousAmount }) => {
			if (data.length > 0) {
				updateExpense(data[0]);
				updateBalance(data[0].amount, data[0].account_id, previousAmount);
			}

			console.log('Updated expense success');
		},
		onError: (err: Error) => {
			Alert.alert('Updating Failed', err.message);
		},
	});
};
