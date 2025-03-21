import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const userLogout = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}
};

export const useUserLogout = () =>
	useMutation({
		mutationFn: userLogout,
		onSuccess: () => {
			console.log('✅ Successfully logged out!');
		},
		onError: (err: Error) => {
			Alert.alert('Logout Failed', err.message);
		},
	});
