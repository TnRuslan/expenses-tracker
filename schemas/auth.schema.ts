import { z } from 'zod';

export const emailSchema = z
	.string({ required_error: 'Email is required' })
	.email('Email is not valid');

export const passwordSchema = z
	.string({ required_error: 'Password is required' })
	.min(6, { message: 'Password must be at least 6 characters long' })
	.regex(/^\S+$/, { message: 'Password can not contain spaces' })
	.regex(/[A-Z]/, {
		message: 'Password must contain at least one uppercase letter',
	})
	.regex(/\d/, { message: 'Password must contain at least one number' });

export const registerSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
		confirm_password: passwordSchema,
	})
	.refine(({ password, confirm_password }) => password === confirm_password, {
		path: ['confirm_password'],
		message: 'Passwords do not match',
	});

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export type RegisterFormValue = z.infer<typeof registerSchema>;
export type LoginFormValue = z.infer<typeof loginSchema>;
