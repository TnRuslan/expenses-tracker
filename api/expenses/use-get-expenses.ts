import { supabase } from '@/lib/supabase';
import { Expense } from '@/types/expenses';
import { useQuery } from '@tanstack/react-query';

export const fetchExpenses = async (): Promise<Expense[]> => {
	const { data, error } = await supabase
		.from('expenses')
		.select('*')
		.order('date', { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useExpenses = () =>
	useQuery({
		queryKey: ['expenses'],
		queryFn: fetchExpenses,
	});
