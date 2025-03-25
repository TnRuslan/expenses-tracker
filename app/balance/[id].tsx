import { useAddExpenses } from '@/api/expenses/use-add-expenses';
import { useExpenses } from '@/api/expenses/use-get-expenses';
import ExpenseCard from '@/components/expenses/ExpenseCard';
import ExpenseDialog from '@/components/expenses/ExpenseDialog';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

import { CreateExpenseFormValue } from '@/schemas/expense.schema';
import { useAppStore } from '@/store/app.store';
import { Button } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';

export default function BalanceDetails() {
	const { id } = useLocalSearchParams();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { data, isFetching } = useExpenses();

	const { setExpenses, getExpensesByAccountId, getAccountById } = useAppStore();

	const account = getAccountById(Number(id));

	const filteredExpenses = getExpensesByAccountId(Number(id));

	const toggleModal = () => {
		setIsOpen((prev) => !prev);
	};

	const { mutate } = useAddExpenses();

	const onSubmit = (data: CreateExpenseFormValue) => {
		mutate({ ...data, account_id: account?.id ?? 0 });
		toggleModal();
	};

	useEffect(() => {
		setExpenses(data || []);
	}, [data]);

	if (!account) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ThemedText type="subtitle">Balance not found</ThemedText>
			</View>
		);
	}

	return (
		<>
			<ParallaxScrollView
				headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
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
				{account && (
					<ThemedText type="title">
						Balance: {String(account.balance)} {account.currency}
					</ThemedText>
				)}
				<Button title="+" onPress={toggleModal} />

				{isFetching && <ActivityIndicator />}

				{filteredExpenses?.length ? (
					filteredExpenses.map((item) => (
						<ExpenseCard key={item.id} expense={item} />
					))
				) : (
					<ThemedText type="title">there are no expenses yet</ThemedText>
				)}
			</ParallaxScrollView>
			<ExpenseDialog
				title="Add Expense"
				isOpen={isOpen}
				onClose={toggleModal}
				onSubmit={onSubmit}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	logo: {
		height: 150,
		width: 200,
		position: 'absolute',
	},
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
});
