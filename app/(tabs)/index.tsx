import { Image, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

import { useUserLogout } from '@/api/auth/use-user-logout';
import { Button } from '@rneui/themed';

export default function HomeScreen() {

	const { mutate: logout, isPending: isPendingLogout } = useUserLogout();

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Image
						source={require('@/assets/images/money.png')}
						style={styles.reactLogo}
					/>
				</View>
			}
		>
			<View style={styles.verticallySpaced}>
				<Button
					title="Log out"
					disabled={isPendingLogout}
					onPress={() => logout()}
				/>
			</View>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 150,
		width: 200,
		position: 'absolute',
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
});
