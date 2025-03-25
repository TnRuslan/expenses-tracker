export type Balance = {
	balance: number;
	currency: BalanceCurrency;
	id: number;
};

export type UpdateBalanceParams = Pick<Balance, 'id' | 'balance'>;

export type CreateBalance = Omit<Balance, 'id'>;

export enum BalanceActionType {
	ADD = 'ADD',
	SUBTRACT = 'SUBTRACT',
	UPDATE = 'UPDATE',
}

export enum BalanceCurrency {
	UAH = 'UAH',
	USD = 'USD',
	EUR = 'EUR',
}
