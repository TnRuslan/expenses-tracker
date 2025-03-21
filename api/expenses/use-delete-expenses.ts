import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

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
	const { removeExpense, addToBalance } = useAppStore();
	return useMutation({
		mutationFn: deleteExpenses,
		onSuccess: (_, { id, amount }) => {
			console.log('Delete expense success');
			removeExpense(id);
			addToBalance(amount, 2);
		},
		onError: (err: Error) => {
			Alert.alert('Deleting Failed', err.message);
		},
	});
};
