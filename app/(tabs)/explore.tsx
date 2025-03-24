import { ActivityIndicator, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useExpenses } from '@/api/expenses/use-get-expenses';
import { Button } from '@rneui/themed';

import { useAppStore } from '@/store/app.store';
import React, { useEffect, useState } from 'react';

import { useAddExpenses } from '@/api/expenses/use-add-expenses';
import { CreateExpenseFormValue } from '@/schemas/expense.schema';
import { useBalances } from '@/api/balance/use-get-balances';
import ExpenseCard from '@/components/expenses/ExpenseCard';

import ExpenseDialog from '@/components/expenses/ExpenseDialog';

export default function TabTwoScreen() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { data: balanceData } = useBalances();
	const { data, isFetching } = useExpenses();

	const { accounts, expenses, setExpenses, setBalance } = useAppStore();

	const toggleModal = () => {
		setIsOpen((prev) => !prev);
	};

	const { mutate } = useAddExpenses();

	const onSubmit = (data: CreateExpenseFormValue) => {
		mutate({ ...data, account_id: 3 });
	};

	useEffect(() => {
		setExpenses(data || []);
		setBalance(balanceData || []);
	}, [data, balanceData]);

	return (
		<>
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
						Balance: {`${accounts[0].balance} ${accounts[0].currency}`}
					</ThemedText>
				)}
				<Button title="+" onPress={toggleModal} />

				{isFetching && <ActivityIndicator />}

				{expenses?.length ? (
					expenses.map((item) => <ExpenseCard key={item.id} expense={item} />)
				) : (
					<ThemedText>there are no expenses yet</ThemedText>
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
	bottomSheetContainer: {
		backgroundColor: 'transparent',
		// height: '40%',
		// overflow: 'hidden',
	},
});
