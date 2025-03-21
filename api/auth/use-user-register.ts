import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

type UserRegisterParams = {
	email: string;
	password: string;
};

export const userRegister = async ({ email, password }: UserRegisterParams) => {
	const {
		data: { session },
		error,
	} = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	if (!session) Alert.alert('Please check your inbox for email verification!');

	return session;
};

export const useUserRegister = () =>
	useMutation({
		mutationFn: userRegister,
		onSuccess: () => {
			console.log('success register');
		},
		onError: (err: Error) => {
			Alert.alert('Register Failed', err.message);
		},
	});
