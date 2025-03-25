import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

import { IconSymbol } from '@/components/ui/IconSymbol';

import { Button } from '@rneui/themed';

import { useUserLogout } from '@/api/auth/use-user-logout';
import { useAppStore } from '@/store/app.store';
import { ExpenseCategory } from '@/types/expenses';
import { ThemedText } from '@/components/ThemedText';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
	const categories = Object.values(ExpenseCategory).map((categoryName) => ({
		label: categoryName,
		value: categoryName,
	}));

	const { mutate: logout, isPending: isPendingLogout } = useUserLogout();
	const [selectedCategory, setSelectedCategory] = useState<
		ExpenseCategory | ''
	>('');

	const { getExpensesTotalByCategory } = useAppStore();

	const handleSelectCategory = (category: ExpenseCategory | '') => {
		setSelectedCategory(category);
	};

	const total = getExpensesTotalByCategory(selectedCategory);

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
			<ThemedView style={{ marginBottom: 100 }}>
				<Picker
					selectedValue={selectedCategory}
					onValueChange={(value) => handleSelectCategory(value)}
					style={styles.picker}
				>
					{categories.map((option, index) => (
						<Picker.Item
							key={index}
							label={option.label}
							value={option.value}
						/>
					))}
				</Picker>
				<ThemedText type='subtitle'>
					Total by {selectedCategory} Category: {String(total)}
				</ThemedText>
			</ThemedView>
			<Button
				title="Log out"
				disabled={isPendingLogout}
				onPress={() => logout()}
			/>
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
	picker: {
		color: 'white',
		borderRadius: 8,
	},
});
