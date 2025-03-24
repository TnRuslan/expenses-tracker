import { Dialog } from '@rneui/themed';
import ExpenseForm from '../ExpenseForm';
import { CreateExpenseFormValue } from '@/schemas/expense.schema';

export type ExpenseDialogParams = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CreateExpenseFormValue) => void;
	title: string;
	defaultValues?: CreateExpenseFormValue;
};

export default function ExpenseDialog({
	isOpen,
	onClose,
	onSubmit,
	title,
	defaultValues,
}: ExpenseDialogParams) {
	return (
		<Dialog
			overlayStyle={{
				padding: 0,
				backgroundColor: 'transparent',
			}}
			isVisible={isOpen}
			onBackdropPress={onClose}
		>
			<ExpenseForm
				onSubmit={onSubmit}
				submitText={title}
				initialValues={defaultValues}
			/>
		</Dialog>
	);
}
