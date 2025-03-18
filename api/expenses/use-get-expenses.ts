import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export const fetchExpenses = async () => {
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
	useQuery({ queryKey: ['expenses'], queryFn: fetchExpenses });
