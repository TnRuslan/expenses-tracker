import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const deleteBalance = async (id: number) => {
	const { error } = await supabase.from('accounts').delete().eq('id', id);

	if (error) {
		throw new Error(error.message);
	}
};

export const useDeleteBalance = () => {
	const { removeAccount } = useAppStore();
	return useMutation({
		mutationFn: deleteBalance,
		onSuccess: (_, id) => {
			removeAccount(id);
			console.log('Delete balance success');
		},
		onError: (err: Error) => {
			Alert.alert('Deleting Failed', err.message);
		},
	});
};
