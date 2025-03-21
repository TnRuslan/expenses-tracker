import { Input, InputProps } from '@rneui/themed';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type ControlledInputProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	isNumeric?: boolean;
} & Omit<InputProps, 'name'>;

export default function ControlledInput<T extends FieldValues>({
	control,
	name,
	isNumeric,
	...inputProps
}: ControlledInputProps<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, onBlur, value },
				fieldState: { error },
			}) => (
				<Input
					{...inputProps}
					onChangeText={(text) =>
						onChange(isNumeric ? Number(text) || 0 : text)
					}
					value={isNumeric ? value.toString() : value}
					onBlur={onBlur}
					errorMessage={error?.message}
				/>
			)}
		/>
	);
}
