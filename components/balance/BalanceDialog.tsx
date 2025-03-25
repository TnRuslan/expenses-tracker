import { Dialog } from '@rneui/themed';
import { CreateBalanceFormValue } from '@/schemas/balance.schema';
import BalanceForm from './BalanceForm';

export type BalanceDialogParams = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CreateBalanceFormValue) => void;
	title: string;
	defaultValues?: CreateBalanceFormValue;
};

export default function BalanceDialog({
	isOpen,
	onClose,
	onSubmit,
	title,
	defaultValues,
}: BalanceDialogParams) {
	return (
		<Dialog
			overlayStyle={{
				padding: 0,
				backgroundColor: 'transparent',
			}}
			isVisible={isOpen}
			onBackdropPress={onClose}
		>
			<BalanceForm
				onSubmit={onSubmit}
				submitText={title}
				initialValues={defaultValues}
			/>
		</Dialog>
	);
}
