import { supabase } from '@/lib/supabase';
import { Balance } from '@/types/balances';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const addBalance = async (balance: Balance) => {
	const { data: userData, error: userError } = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from('accounts')
		.insert([{ user_id: userData?.user?.id, ...balance }]);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useAddBalance = () =>
	useMutation({
		mutationFn: addBalance,
		onSuccess: () => {
			console.log('Added Balance success');
		},
		onError: (err: Error) => {
			Alert.alert('Adding Failed', err.message);
		},
	});
