export type Balance = {
	balance: number;
	currency: string;
};

export type UpdateBalanceParams = Partial<Balance> & {
	id: number;
};
