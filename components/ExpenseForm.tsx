import { StyleSheet, View } from 'react-native';

import { Button } from '@rneui/themed';

import { useForm } from 'react-hook-form';
import { ExpenseCategory } from '@/types/expenses';
import {
	CreateExpenseFormValue,
	createExpenseSchema,
} from '@/schemas/expense.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledInput from '@/components/ui/form/controlled-input';
import ControlledSelect from '@/components/ui/form/controlled-select';
import ControlledDatepicker from '@/components/ui/form/controlled-datepicker';

export type ExpenseFormProps = {
	initialValues?: CreateExpenseFormValue;
	onSubmit: (data: CreateExpenseFormValue) => void;
	submitText?: string;
};

export default function ExpenseForm({
	initialValues,
	onSubmit,
	submitText = 'Submit',
}: ExpenseFormProps) {
	const categories = Object.values(ExpenseCategory).map((categoryName) => ({
		label: categoryName,
		value: categoryName,
	}));

	const defaultValues: CreateExpenseFormValue = initialValues || {
		title: '',
		amount: 0,
		category: ExpenseCategory.FOOD,
		date: new Date().toISOString().split('T')[0],
	};

	const { control, handleSubmit, reset } = useForm<CreateExpenseFormValue>({
		defaultValues,
		resolver: zodResolver(createExpenseSchema),
	});

	const handleFormSubmit = (data: CreateExpenseFormValue) => {
		onSubmit(data);
		reset(defaultValues);
	};

	return (
		<View style={[styles.verticallySpaced, styles.mt20]}>
			<ControlledInput
				control={control}
				name="title"
				label="Title"
				leftIcon={{
					type: 'font-awesome',
					name: 'pencil',
					color: 'white',
				}}
				placeholder="Title"
				style={{
					color: 'white',
				}}
			/>
			<ControlledInput
				control={control}
				name="amount"
				label="Amount"
				isNumeric
				leftIcon={{
					type: 'font-awesome',
					name: 'money',
					color: 'white',
				}}
				placeholder="0"
				keyboardType="numeric"
				style={{
					color: 'white',
				}}
			/>
			<ControlledSelect
				control={control}
				name="category"
				label="Categories"
				options={categories}
			/>

			<ControlledDatepicker control={control} name="date" />

			<Button onPress={handleSubmit(handleFormSubmit)} title={submitText} />
		</View>
	);
}

const styles = StyleSheet.create({
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
});
