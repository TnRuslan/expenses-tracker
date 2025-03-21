import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Picker } from '@react-native-picker/picker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type ControlledSelectProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	options: { label: string; value: string | number }[];
};

export default function ControlledSelect<T extends FieldValues>({
	control,
	name,
	label,
	options,
}: ControlledSelectProps<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, onBlur, value },
				fieldState: { error },
			}) => (
				<View style={styles.pickerContainer}>
					{label && <ThemedText style={styles.pickerLabel}>{label}</ThemedText>}

					<Picker
						selectedValue={value}
						onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
						onBlur={onBlur}
						style={styles.picker}
					>
						{options.map((option, index) => (
							<Picker.Item
								key={index}
								label={option.label}
								value={option.value}
							/>
						))}
					</Picker>
					{error && (
						<ThemedText style={styles.error}>{error.message}</ThemedText>
					)}
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	pickerContainer: {
		marginBottom: 20,
	},
	pickerLabel: {
		color: 'white',
		fontSize: 16,
		marginBottom: 8,
	},
	picker: {
		color: 'white',
		borderRadius: 8,
	},
	error: {
		color: 'red',
		marginTop: 4,
	},
});
