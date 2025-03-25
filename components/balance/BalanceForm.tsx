import {
	CreateBalanceFormValue,
	createBalanceSchema,
} from '@/schemas/balance.schema';
import { BalanceCurrency } from '@/types/balances';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ControlledInput from '../ui/form/controlled-input';
import ControlledSelect from '../ui/form/controlled-select';
import { Button } from '@rneui/themed';
import { ThemedView } from '../ThemedView';

export type BalanceFormParams = {
	initialValues?: CreateBalanceFormValue;
	onSubmit: (data: CreateBalanceFormValue) => void;
	submitText?: string;
};

export default function BalanceForm({
	initialValues,
	onSubmit,
	submitText,
}: BalanceFormParams) {
	const currency = Object.values(BalanceCurrency).map((currency) => ({
		label: currency,
		value: currency,
	}));

	const defaultValues: CreateBalanceFormValue = initialValues || {
		balance: 0,
		currency: BalanceCurrency.UAH,
	};

	const { control, handleSubmit, reset } = useForm<CreateBalanceFormValue>({
		defaultValues,
		resolver: zodResolver(createBalanceSchema),
	});

	const handleFormSubmit = (data: CreateBalanceFormValue) => {
		onSubmit(data);
		reset();
	};

	return (
		<ThemedView
			style={{
				alignSelf: 'stretch',
				backgroundColor: '#202324',
				padding: 20,
				borderRadius: 20,
			}}
		>
			<ControlledInput
				control={control}
				name="balance"
				label="Balance"
				isNumeric
				leftIcon={{ type: 'font-awesome', name: 'money', color: 'white' }}
				placeholder="0"
				keyboardType="numeric"
				style={{
					color: 'white',
				}}
			/>

			<ControlledSelect
				control={control}
				name="currency"
				label="Currency"
				options={currency}
			/>

			<Button title={submitText} onPress={handleSubmit(handleFormSubmit)} />
		</ThemedView>
	);
}
