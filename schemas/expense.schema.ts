import { ExpenseCategory } from '@/types/expenses';
import { z } from 'zod';

export const createExpenseSchema = z.object({
	title: z
		.string({ required_error: 'Title is required.' })
		.min(3, { message: 'Title must be at least 3 characters' })
		.max(100, { message: 'Title must not be longer than 100 characters' }),
	amount: z
		.number({ required_error: 'Amount is required.' })
		.positive({ message: 'Amount must be a positive number.' }),
	category: z.nativeEnum(ExpenseCategory, {
		errorMap: () => ({ message: 'Invalid category selected.' }),
	}),
	date: z
		.string({ required_error: 'Date is required.' })
		.refine((val) => !isNaN(Date.parse(val)), {
			message: 'Invalid date format.',
		}),
});

export type CreateExpenseFormValue = z.infer<typeof createExpenseSchema>;
