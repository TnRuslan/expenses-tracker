import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const deleteExpenses = async (id: number) => {
	const { error } = await supabase.from('expenses').delete().eq('id', id);

	if (error) {
		throw new Error(error.message);
	}
};

export const useDeleteExpenses = () =>
	useMutation({
		mutationFn: deleteExpenses,
		onSuccess: () => {
			console.log('Delete expense success');
		},
		onError: (err: Error) => {
			Alert.alert('Deleting Failed', err.message);
		},
	});
