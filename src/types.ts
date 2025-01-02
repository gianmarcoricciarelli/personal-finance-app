import data from '@data/data.json'

export type Balance = typeof data.balance
export type Pot = (typeof data.pots)[0]
export type Transaction = (typeof data.transactions)[0]

export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xxl'
export type FontStyle = 'normal' | 'bold'
export type Color = 'pfa-grey-500' | 'pfa-grey-900' | 'pfa-white' | 'pfa-green'
export type Gap = '1' | '2' | '3'
