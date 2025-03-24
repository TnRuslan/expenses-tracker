import { useUserRegister } from '@/api/auth/use-user-register';
import { RegisterFormValue, registerSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import ControlledInput from '../ui/form/controlled-input';
import { Button } from '@rneui/themed';

export default function RegisterForm() {
	const defaultValues: RegisterFormValue = {
		email: '',
		password: '',
		confirm_password: '',
	};

	const { control, handleSubmit, reset } = useForm<RegisterFormValue>({
		defaultValues,
		resolver: zodResolver(registerSchema),
	});

	const { mutate: register, isPending: isPendingRegister } = useUserRegister();

	const handleFormSubmit = ({ email, password }: RegisterFormValue) => {
		register({ email, password });
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
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<ControlledInput
					control={control}
					name="confirm_password"
					label="Confirm Password"
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
					secureTextEntry={true}
					placeholder="Confirm Password"
					autoCapitalize="none"
				/>
			</View>
			{isPendingRegister && <ActivityIndicator />}

			<View style={styles.verticallySpaced}>
				<Button
					title="Sign up"
					disabled={isPendingRegister}
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
