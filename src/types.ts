import data from '@data/data.json'

export type Balance = typeof data.balance
export type Pot = (typeof data.pots)[0]
export type Transaction = (typeof data.transactions)[0]
