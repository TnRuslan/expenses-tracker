import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const deleteBalance = async (id: number) => {
	const { error } = await supabase.from('accounts').delete().eq('id', id);

	if (error) {
		throw new Error(error.message);
	}
};

export const useDeleteBalance = () =>
	useMutation({
		mutationFn: deleteBalance,
		onSuccess: () => {
			console.log('Delete balance success');
		},
		onError: (err: Error) => {
			Alert.alert('Deleting Failed', err.message);
		},
	});
