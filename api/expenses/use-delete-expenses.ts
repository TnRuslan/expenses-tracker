import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const deleteExpenses = async (id: number) => {
	const { error } = await supabase.from('expenses').delete().eq('id', id);

	if (error) {
		throw new Error(error.message);
	}
};

export const useDeleteExpenses = () => {
	const { removeExpense } = useAppStore();
	return useMutation({
		mutationFn: deleteExpenses,
		onSuccess: (_, id) => {
			console.log('Delete expense success');
			removeExpense(id);
		},
		onError: (err: Error) => {
			Alert.alert('Deleting Failed', err.message);
		},
	});
};
