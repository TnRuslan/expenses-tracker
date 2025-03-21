import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useExpenses } from '@/api/expenses/use-get-expenses';
import { Button } from '@rneui/themed';
import { useUpdateExpenses } from '@/api/expenses/use-update-expenses';
import { useDeleteExpenses } from '@/api/expenses/use-delete-expenses';
import { useAppStore } from '@/store/app.store';
import React, { useEffect } from 'react';

import ExpenseForm from '@/components/ExpenseForm';
import { useAddExpenses } from '@/api/expenses/use-add-expenses';
import { CreateExpenseFormValue } from '@/schemas/expense.schema';
import { useBalances } from '@/api/balance/use-get-balances';

export default function TabTwoScreen() {
	const { data: balanceData } = useBalances();
	const { data } = useExpenses();
	// const { mutate: updateExpense } = useUpdateExpenses();
	const { mutate: deleteExpense } = useDeleteExpenses();

	const { accounts, expenses, setExpenses, setBalance } = useAppStore();

	// const handleUpdate =
	// 	(id: number = 27, amount: number) =>
	// 	() => {
	// 		updateExpense({
	// 			id,
	// 			title: 'Test Update',
	// 			amount: 400,
	// 			previousAmount: amount,
	// 		});
	// 	};

	const { mutate } = useAddExpenses();

	const onSubmit = (data: CreateExpenseFormValue) => {
		mutate({ ...data, account_id: 2 });
	};

	const handleDeleteExpenses = (id: number, amount: number) => () => {
		deleteExpense({ id, amount });
	};

	useEffect(() => {
		setExpenses(data || []);
		setBalance(balanceData || []);
	}, [data, balanceData]);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<IconSymbol
					size={310}
					color="#808080"
					name="chevron.left.forwardslash.chevron.right"
					style={styles.headerImage}
				/>
			}
		>
			{accounts.length && (
				<ThemedText type="title">
					Balance: {accounts[1].balance} {accounts[1].currency}
				</ThemedText>
			)}

			<ExpenseForm onSubmit={onSubmit} submitText="Add Expense" />

			{/* <Button title={'Update 10'} onPress={handleUpdate(51, 1333)} /> */}

			{expenses?.length ? (
				expenses.map((item, i) => (
					<ThemedView key={item.id}>
						<ThemedText>№ {i + 1}</ThemedText>
						<ThemedText>amount: {item.amount}</ThemedText>
						<ThemedText>title: {item.title}</ThemedText>
						<ThemedText>category: {item.category}</ThemedText>
						<Button
							title="delete"
							onPress={handleDeleteExpenses(item.id, item.amount)}
						/>
					</ThemedView>
				))
			) : (
				<ThemedText>there are no expenses yet</ThemedText>
			)}
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
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
