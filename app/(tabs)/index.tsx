import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

import { Button } from '@rneui/themed';
import { CreateBalanceFormValue } from '@/schemas/balance.schema';

import { useAddBalance } from '@/api/balance/use-add-balances';
import { useAppStore } from '@/store/app.store';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import BalanceDialog from '@/components/balance/BalanceDialog';
import { useBalances } from '@/api/balance/use-get-balances';
import BalanceCard from '@/components/balance/BalanceCard';

export default function HomeScreen() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { data: balanceData, isFetching } = useBalances();
	const { accounts, setBalance } = useAppStore();
	const { mutate: createBalance } = useAddBalance();

	const onSubmit = ({ balance, currency }: CreateBalanceFormValue) => {
		createBalance({ balance: Number(balance), currency });
		toggleBalanceModal();
	};

	const toggleBalanceModal = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setBalance(balanceData || []);
	}, [balanceData]);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<View
					style={{
						flex: 1,
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<Image
						source={require('@/assets/images/money.png')}
						style={styles.logo}
					/>
				</View>
			}
		>
			{isFetching && <ActivityIndicator />}

			{accounts.length > 0 && (
				<ThemedView style={{ flex: 1 }}>
					{accounts.length < 3 && (
						<Button
							style={{ marginBottom: 20 }}
							title="Add New Balance"
							onPress={toggleBalanceModal}
						/>
					)}
					<BalanceDialog
						isOpen={isOpen}
						onClose={toggleBalanceModal}
						onSubmit={onSubmit}
						title="Add Balance"
					/>

					{accounts.map((account) => (
						<BalanceCard key={account.id} account={account} />
					))}
				</ThemedView>
			)}
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	logo: {
		height: 150,
		width: 200,
		position: 'absolute',
	},
	verticallySpaced: {
		flex: 1,
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
});
