export type Balance = {
	balance: number;
	currency: string;
	id: number;
};

export type UpdateBalanceParams = Partial<Balance> & {
	id: number;
};

export enum BalanceActionType {
	ADD = 'ADD',
	SUBTRACT = 'SUBTRACT',
	UPDATE = 'UPDATE',
}
