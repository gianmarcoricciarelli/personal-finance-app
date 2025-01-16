import data from '@data/data.json'

export type Balance = typeof data.balance
export type Pot = (typeof data.pots)[0]
export type Transaction = (typeof data.transactions)[0]
export type Budget = (typeof data.budgets)[0]

export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xxl'
export type FontStyle = 'normal' | 'bold'
export type Color =
    | 'pfa-beige-100'
    | 'pfa-beige-500'
    | 'pfa-cyan'
    | 'pfa-green'
    | 'pfa-grey-100'
    | 'pfa-grey-300'
    | 'pfa-grey-500'
    | 'pfa-grey-900'
    | 'pfa-red'
    | 'pfa-white'
    | 'pfa-yellow'
export type Gap = '1' | '2' | '3'

export type SortMenuOption =
    | 'Latest'
    | 'Oldest'
    | 'A to Z'
    | 'Z to A'
    | 'Highest'
    | 'Lowest'

export const colorMap: Record<string, string> = {
    Green: '#277C78',
    Yellow: '#F2CDAC',
    Cyan: '#82C9D7',
    Navy: '#626070',
    Red: '#C94736',
    Purple: '#826CB0',
    Turquoise: '#597C7C',
    Brown: '#93674F',
    Magenta: '#934F6F',
    Blue: '#3F82B2',
    'Navy Grey': '#97A0AC',
    'Army Green': '#7F9161',
    Pink: '#AF81BA',
    Gold: '#CAB361',
    Orange: '#BE6C49',
    'Dark Grey': '#201F24',
}
