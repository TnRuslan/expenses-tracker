import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

type UserLoginParams = {
	email: string;
	password: string;
};

export const userLogin = async ({ email, password }: UserLoginParams) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const useUserLogin = () =>
	useMutation({
		mutationFn: userLogin,
		onSuccess: () => {
			console.log('success login');
		},
		onError: (err: Error) => {
			Alert.alert('Login Failed', err.message);
		},
	});
