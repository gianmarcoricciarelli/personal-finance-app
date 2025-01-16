import { SortMenuOption, Transaction } from '../types'

export default function useSortTransactions(
    transactions: Transaction[],
    sorting: SortMenuOption
): void {
    transactions.sort((a, b) => {
        switch (sorting) {
            case 'Latest':
                return new Date(a.date).getDate() - new Date(b.date).getDate()
            case 'Oldest':
                return new Date(b.date).getDate() - new Date(a.date).getDate()
            case 'A to Z':
                return a.name.localeCompare(b.name)
            case 'Z to A':
                return b.name.localeCompare(a.name)
            case 'Highest':
                return Math.abs(b.amount) - Math.abs(a.amount)
            case 'Lowest':
                return Math.abs(a.amount) - Math.abs(b.amount)
        }
    })
}
