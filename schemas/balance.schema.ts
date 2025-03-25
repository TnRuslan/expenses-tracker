import { BalanceCurrency } from '@/types/balances';
import { z } from 'zod';

export const createBalanceSchema = z.object({
	balance: z
		.number({ required_error: 'Balance is required.' })
		.positive({ message: 'Balance must be a positive number.' }),
	currency: z.nativeEnum(BalanceCurrency, {
		errorMap: () => ({ message: 'Invalid currency selected.' }),
	}),
});

export type CreateBalanceFormValue = z.infer<typeof createBalanceSchema>;
