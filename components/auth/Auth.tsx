import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { supabase } from '@/lib/supabase';
import { useUserLogin } from '@/api/auth/use-user-login';
import { useUserRegister } from '@/api/auth/use-user-register';
import { useUserLogout } from '@/api/auth/use-user-logout';

export default function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const { mutate: login, isPending } = useUserLogin();
	const { mutate: register, isPending: isPendingRegister } = useUserRegister();
	const { mutate: logout, isPending: isPendingLogout } = useUserLogout();

	const handleLogin = () => {
		login({ email, password });
	};

	const handleRegister = () => {
		register({ email, password });
	};

	return (
		<View style={styles.container}>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input
					label="Email"
					leftIcon={{ type: 'font-awesome', name: 'envelope' }}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={'none'}
					keyboardType="email-address"
					style={{
						color: 'white',
					}}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Password"
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={'none'}
				/>
			</View>
			{(isPending || isPendingRegister) && <ActivityIndicator />}
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button title="Sign in" disabled={isPending} onPress={handleLogin} />
			</View>
			<View style={styles.verticallySpaced}>
				<Button
					title="Sign up"
					disabled={isPendingRegister}
					onPress={handleRegister}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Button
					title="Log out"
					disabled={isPendingLogout}
					onPress={() => logout()}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
});
