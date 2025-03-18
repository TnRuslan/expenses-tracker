import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export const fetchBalances = async () => {
	const { data, error } = await supabase.from('accounts').select('*');

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useBalances = () =>
	useQuery({ queryKey: ['accounts'], queryFn: fetchBalances });
