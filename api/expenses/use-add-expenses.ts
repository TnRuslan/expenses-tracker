import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/app.store';
import { Expense, UpdateExpensesParams } from '@/types/expenses';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const addExpenses = async (
	expense: UpdateExpensesParams,
): Promise<Expense> => {
	const { data: userData } = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from('expenses')
		.insert([{ user_id: userData?.user?.id, ...expense }])
		.select('*')
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useAddExpenses = () => {
	const { addExpense, subtractToBalance } = useAppStore();
	return useMutation({
		mutationFn: addExpenses,
		onSuccess: (data) => {
			console.log('Added expense success');
			if (data) {
				addExpense(data);
				subtractToBalance(data.amount, data.account_id);
			}
		},
		onError: (err: Error) => {
			Alert.alert('Adding Failed', err.message);
		},
	});
};
