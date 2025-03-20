import { StyleSheet, Image, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useExpenses } from '@/api/expenses/use-get-expenses';
import { useAddExpenses } from '@/api/expenses/use-add-expenses';
import { Button, ButtonGroup, Input } from '@rneui/themed';
import { useUpdateExpenses } from '@/api/expenses/use-update-expenses';
import { useDeleteExpenses } from '@/api/expenses/use-delete-expenses';
import { useAppStore } from '@/store/app.store';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ExpenseCategory } from '@/types/expenses';
import {
	CreateExpenseFormValue,
	createExpenseSchema,
} from '@/schemas/expense.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';

export default function TabTwoScreen() {
	// const { data } = useBalances();
	const categories = Object.values(ExpenseCategory);
	const defaultValues = {
		title: '',
		amount: 0,
		category: ExpenseCategory.FOOD,
		date: new Date().toISOString().split('T')[0],
	};
	const { data } = useExpenses();
	const { mutate } = useAddExpenses();
	const { mutate: updateExpense } = useUpdateExpenses();
	const { mutate: deleteExpense } = useDeleteExpenses();

	const [amount, setAmount] = useState<string>();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateExpenseFormValue>({
		defaultValues,
		resolver: zodResolver(createExpenseSchema),
	});

	const { balance, expenses, setExpenses } = useAppStore();

	const handleAdd = () => {
		mutate({
			title: 'test 1',
			amount: Number(amount),
			category: ExpenseCategory.FOOD,
			date: '2025-03-18',
		});

		setAmount('');
	};

	const onSubmit = (data: CreateExpenseFormValue) => {
		console.log(data);
	};

	const handleUpdate =
		(id: number = 27) =>
		() => {
			updateExpense({ id, title: 'Test Update', amount: 1333 });
		};

	const handleDeleteExpenses = (id: number) => () => {
		deleteExpense(id);
	};

	useEffect(() => {
		setExpenses(data || []);
	}, [data]);

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
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Balance: {balance}</ThemedText>
			</ThemedView>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Controller
					control={control}
					name="title"
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							label="Title"
							leftIcon={{
								type: 'font-awesome',
								name: 'pencil',
								color: 'white',
							}}
							onChangeText={onChange}
							value={value}
							placeholder="Enter expense title"
							// keyboardType="numeric"
							style={{
								color: 'white',
							}}
							onBlur={onBlur}
							errorMessage={error?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="amount"
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							label="Amount"
							leftIcon={{
								type: 'font-awesome',
								name: 'money',
								color: 'white',
							}}
							onChangeText={(text) => onChange(Number(text))}
							value={value ? value.toString() : ''}
							placeholder="0"
							keyboardType="numeric"
							style={{
								color: 'white',
							}}
							onBlur={onBlur}
							errorMessage={error?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="category"
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<View style={styles.pickerContainer}>
							<ThemedText style={styles.pickerLabel}>Category: </ThemedText>
							<Picker
								selectedValue={value}
								onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
								onBlur={onBlur}
							>
								{categories.map((category, index) => (
									<Picker.Item key={index} label={category} value={category} />
								))}
							</Picker>
						</View>
					)}
				/>
			</View>

			<Button title={'Update 10'} onPress={handleUpdate(27)} />

			{expenses?.length ? (
				expenses.map((item, i) => (
					<ThemedView key={item.id}>
						<ThemedText>№ {i + 1}</ThemedText>
						<ThemedText>amount: {item.amount}</ThemedText>
						<ThemedText>title: {item.title}</ThemedText>
						<ThemedText>category: {item.category}</ThemedText>
						<Button title="delete" onPress={handleDeleteExpenses(item.id)} />
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
	icon: {
		position: 'absolute',
		right: 10,
		top: 15,
		color: 'white',
		fontSize: 14,
	},
	pickerContainer: {
		marginBottom: 20,
	},
	pickerLabel: {
		color: 'white',
		fontSize: 16,
		marginBottom: 8,
	},
	picker: {
		width: '100%',
		height: 50,
		backgroundColor: '#6200ea', // Set background color to match your theme
		color: 'white', // Text color inside the Picker
		borderRadius: 8,
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 4,
	},
});
