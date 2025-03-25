import { Stack } from 'expo-router';

export default function BalanceLayout() {
	return (
		<Stack>
			<Stack.Screen name="[id]" options={{ headerShown: false }} />
		</Stack>
	);
}
