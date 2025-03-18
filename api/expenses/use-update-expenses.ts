import { supabase } from '@/lib/supabase';
import { UpdateExpensesParams } from '@/types/expenses';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const updateExpenses = async ({
	id,
	...expense
}: UpdateExpensesParams) => {
	const { data, error } = await supabase
		.from('expenses')
		.update(expense)
		.eq('id', id);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useUpdateExpenses = () =>
	useMutation({
		mutationFn: updateExpenses,
		onSuccess: () => {
			console.log('Updated expense success');
		},
		onError: (err: Error) => {
			Alert.alert('Updating Failed', err.message);
		},
	});
