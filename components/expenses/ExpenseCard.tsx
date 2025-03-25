import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Expense } from '@/types/expenses';
import { useDeleteExpenses } from '@/api/expenses/use-delete-expenses';
import { ThemedView } from '../ThemedView';
import { Button } from '@rneui/themed';
import ExpenseDialog from './ExpenseDialog';
import { useUpdateExpenses } from '@/api/expenses/use-update-expenses';
import { CreateExpenseFormValue } from '@/schemas/expense.schema';
import { useAppStore } from '@/store/app.store';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';

interface ExpenseCardProps {
	expense: Expense;
}

export default function ExpenseCard({ expense }: ExpenseCardProps) {
	const { mutate: deleteExpense, isPending } = useDeleteExpenses();
	const { mutate: updateExpense } = useUpdateExpenses();
	const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);


	const { getAccountById } = useAppStore();

	const handleDelete = (expense: Expense) => () => {
		deleteExpense(expense);
	};
	const account = getAccountById(expense.account_id);

	const toggleModal = () => {
		setIsOpenUpdateModal((prev) => !prev);
	};

	const handleUpdate = (data: CreateExpenseFormValue) => {
		updateExpense({
			id: expense.id,
			...data,
			previousAmount: expense.amount,
		});
		toggleModal();
	};

	return (
		<>
			<ThemedView style={styles.card}>
				<ThemedText style={styles.title}>{expense.title}</ThemedText>
				<ThemedText style={styles.title}>
					Amount: {String(expense.amount)} {account?.currency}
				</ThemedText>
				<View style={styles.categoryWrapper}>
					<ThemedText style={styles.amount}>{expense.category}</ThemedText>
					<ThemedText style={styles.amount}>
						{new Date(expense.date).toLocaleDateString()}
					</ThemedText>
				</View>

				<View style={styles.buttonsContainer}>
					<Button title="Update" onPress={toggleModal} />
					<Button
						title="Delete"
						onPress={handleDelete(expense)}
						color={Colors.dark.deleteButton}
						loading={isPending}
					/>
				</View>
			</ThemedView>
			<ExpenseDialog
				title="Update"
				isOpen={isOpenUpdateModal}
				onClose={toggleModal}
				defaultValues={{
					title: expense.title,
					amount: expense.amount,
					category: expense.category,
					date: expense.date,
				}}
				onSubmit={handleUpdate}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 16,
		marginBottom: 16,
		backgroundColor: '#767f9b',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	amount: {
		fontSize: 18,
		color: '#333',
	},
	category: {
		fontSize: 14,
		color: '#777',
	},
	buttonsContainer: {
		marginTop: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	categoryWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
