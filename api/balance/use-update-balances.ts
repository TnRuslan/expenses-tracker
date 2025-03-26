import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { Balance } from '@/types/balances';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const updateBalance = async ({
	id,
	...account
}: Balance): Promise<Balance> => {
	const { data, error } = await supabase
		.from('accounts')
		.update(account)
		.eq('id', id)
		.select('*')
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useUpdateBalance = () => {
	const { updateAccount } = useAppStore();
	return useMutation({
		mutationFn: updateBalance,
		onSuccess: (data) => {
			if (data) {
				updateAccount(data);
			}
			console.log('Updated balance success');
		},
		onError: (err: Error) => {
			Alert.alert('Updating Failed', err.message);
		},
	});
};
