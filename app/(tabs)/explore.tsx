import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useExpenses } from '@/api/expenses/use-get-expenses';
import { useAddExpenses } from '@/api/expenses/use-add-expenses';
import { Button } from '@rneui/themed';
import { useUpdateExpenses } from '@/api/expenses/use-update-expenses';
import { useDeleteExpenses } from '@/api/expenses/use-delete-expenses';
import { useBalances } from '@/api/balance/use-get-balances';

export default function TabTwoScreen() {
	const { data } = useBalances();
	const { mutate } = useAddExpenses();
	const { mutate: updateExpense } = useUpdateExpenses();
	const { mutate: deleteExpense } = useDeleteExpenses();

	console.log(data);

	const handleAdd = () => {
		mutate({
			title: 'test 1',
			amount: 100,
			category: 'games',
			date: '2025-03-18',
		});
	};

	const handleUpdate =
		(id: number = 10) =>
		() => {
			updateExpense({ id, title: 'Test Update', amount: 1000 });
		};

	const handleDeleteExpenses = (id: number) => () => {
		deleteExpense(id);
	};

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
				<ThemedText type="title">Explore</ThemedText>
			</ThemedView>

			<Button title={'add'} onPress={handleAdd} />
			<Button title={'Update 10'} onPress={handleUpdate(10)} />
			<Button title={'delete 1'} onPress={handleDeleteExpenses(5)} />
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
});
