import { LoginFormValue, loginSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import ControlledInput from '../ui/form/controlled-input';
import { Button } from '@rneui/themed';
import { useUserLogin } from '@/api/auth/use-user-login';

export default function LoginForm() {
	const defaultValues: LoginFormValue = {
		email: '',
		password: '',
	};

	const { control, handleSubmit, reset } = useForm<LoginFormValue>({
		defaultValues,
		resolver: zodResolver(loginSchema),
	});

	const { mutate: login, isPending } = useUserLogin();

	const handleFormSubmit = ({ email, password }: LoginFormValue) => {
		login({ email, password });
		reset();
	};

	return (
		<>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<ControlledInput
					control={control}
					name="email"
					label="Email"
					placeholder="email@address.com"
					autoCapitalize="none"
					keyboardType="email-address"
					leftIcon={{ type: 'font-awesome', name: 'envelope' }}
					style={{
						color: 'white',
					}}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<ControlledInput
					control={control}
					name="password"
					label="Password"
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize="none"
					style={{
						color: 'white',
					}}
				/>
			</View>
			{isPending && <ActivityIndicator />}

			<View style={styles.verticallySpaced}>
				<Button
					title="Sign in"
					disabled={isPending}
					onPress={handleSubmit(handleFormSubmit)}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
});
