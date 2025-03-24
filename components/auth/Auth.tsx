import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { ThemedView } from '../ThemedView';

export default function Auth() {
	const [isLogin, setIsLogin] = useState<boolean>(true);

	const toggleIsLogin = () => {
		setIsLogin((prev) => !prev);
	};

	return (
		<ThemedView style={styles.content}>
			{isLogin ? <LoginForm /> : <RegisterForm />}

			<View style={styles.verticallySpaced}>
				<Button
					title={isLogin ? 'Go to Register' : 'Go to Login'}
					onPress={toggleIsLogin}
				/>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	content: {
		flex: 1,
		padding: 32,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
		overflow: 'hidden',
	},
});
