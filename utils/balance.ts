import { BalanceActionType } from '@/types/balances';

export type handleBalanceParams = {
	action: BalanceActionType;
	balance: number;
	amount: number;
	previousAmount?: number;
};

export const handleBalanceUpdate = ({
	action,
	balance,
	amount,
	previousAmount = 0,
}: handleBalanceParams): number => {
	const balanceActions: Record<BalanceActionType, number> = {
		[BalanceActionType.ADD]: balance + amount,
		[BalanceActionType.SUBTRACT]: balance - amount,
		[BalanceActionType.UPDATE]: balance + previousAmount - amount,
	};

	return balanceActions[action] ?? balance;
};
