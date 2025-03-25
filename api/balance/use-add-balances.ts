import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { Balance, CreateBalance } from '@/types/balances';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const addBalance = async (balance: CreateBalance): Promise<Balance> => {
	const { data: userData, error: userError } = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from('accounts')
		.insert([{ user_id: userData?.user?.id, ...balance }])
		.select('*')
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useAddBalance = () => {
	const { addAccount } = useAppStore();
	return useMutation({
		mutationFn: addBalance,
		onSuccess: (data) => {
			if (data) {
				addAccount(data);
			}
			console.log('Added Balance success');
		},
		onError: (err: Error) => {
			Alert.alert('Adding Failed', err.message);
		},
	});
};
