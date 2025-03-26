import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ThemedView } from '../ThemedView';
import { Balance } from '@/types/balances';
import BalanceDialog from './BalanceDialog';
import { Button } from '@rneui/themed';
import { ThemedText } from '../ThemedText';
import { useDeleteBalance } from '@/api/balance/use-delete-balances';
import { useUpdateBalance } from '@/api/balance/use-update-balances';
import { CreateBalanceFormValue } from '@/schemas/balance.schema';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export type BalanceCardProps = {
	account: Balance;
};

export default function BalanceCard({ account }: BalanceCardProps) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { mutate: deleteBalance, isPending } = useDeleteBalance();
	const { mutate: updateBalance } = useUpdateBalance();

	const toggleUpdateModal = () => {
		setIsOpen((prev) => !prev);
	};

	const handleUpdate = (data: CreateBalanceFormValue) => {
		updateBalance({
			id: account.id,
			...data,
		});
		toggleUpdateModal();
	};

	const handleDelete = (id: number) => () => {
		deleteBalance(id);
	};

	return (
		<Pressable onPress={() => router.push(`/balance/${account.id}`)}>
			<ThemedView style={styles.card}>
				<View style={styles.balanceContainer}>
					<ThemedText style={styles.title}>{account.currency}: </ThemedText>
					<ThemedText style={styles.title}>
						{String(account.balance)}
					</ThemedText>
				</View>

				<View style={styles.buttonsContainer}>
					<Button title="Update" onPress={toggleUpdateModal} />
					<Button
						title="Delete"
						onPress={handleDelete(account.id)}
						color={Colors.dark.deleteButton}
						loading={isPending}
					/>
				</View>
			</ThemedView>
			<BalanceDialog
				title="Update"
				isOpen={isOpen}
				onClose={toggleUpdateModal}
				defaultValues={{
					balance: account.balance,
					currency: account.currency,
				}}
				onSubmit={handleUpdate}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#767f9b',
		padding: 16,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 8,
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 10,
	},
	balanceContainer: {
		flexDirection: 'row',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});
