import { supabase } from '@/lib/supabase';
import { UpdateBalanceParams } from '@/types/balances';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const updateBalance = async ({ id, ...balance }: UpdateBalanceParams) => {
	const { data, error } = await supabase
		.from('accounts')
		.update(balance)
		.eq('id', id);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useUpdateBalance = () =>
	useMutation({
		mutationFn: updateBalance,
		onSuccess: () => {
			console.log('Updated balance success');
		},
		onError: (err: Error) => {
			Alert.alert('Updating Failed', err.message);
		},
	});
