export type Balance = {
	balance: number;
	currency: string;
	id: number;
};

export type UpdateBalanceParams = Pick<Balance, 'id' | 'balance'>;

export enum BalanceActionType {
	ADD = 'ADD',
	SUBTRACT = 'SUBTRACT',
	UPDATE = 'UPDATE',
}
