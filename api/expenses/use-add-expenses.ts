import { supabase } from '@/lib/supabase';
import { Expense } from '@/types/expenses';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const addExpenses = async (expense: Expense) => {
	const { data: userData, error: userError } = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from('expenses')
		.insert([{ user_id: userData?.user?.id, ...expense }]);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useAddExpenses = () =>
	useMutation({
		mutationFn: addExpenses,
		onSuccess: () => {
			console.log('Added expense success');
		},
		onError: (err: Error) => {
			Alert.alert('Adding Failed', err.message);
		},
	});
