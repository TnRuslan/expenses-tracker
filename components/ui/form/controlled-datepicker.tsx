import { ThemedView } from '@/components/ThemedView';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export type ControlledDatepickerProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
};

export default function ControlledDatepicker<T extends FieldValues>({
	control,
	name,
}: ControlledDatepickerProps<T>) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<ThemedView style={{ marginBottom: 20 }}>
					<Button
						title={value ? new Date(value).toDateString() : 'Select Date'}
						onPress={() => {
							setIsOpen(true);
						}}
					/>

					<DateTimePickerModal
						isVisible={isOpen}
						mode="date"
						date={value ? new Date(value) : new Date()}
						display={Platform.OS === 'ios' ? 'spinner' : 'default'}
						onConfirm={(selectedDate) => {
							setIsOpen(false);
							onChange(selectedDate.toISOString());
						}}
						onCancel={() => setIsOpen(false)}
						pickerContainerStyleIOS={{ alignItems: 'center' }}
					/>
				</ThemedView>
			)}
		/>
	);
}
