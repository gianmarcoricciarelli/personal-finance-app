import DataContext from '@contexts/Data/Data.context'
import useSortTransactions from '@hooks/useSortTransactions'
import clsx from 'clsx'
import { useContext, useState } from 'react'
import { SortMenuOption, Transaction } from '../../../types'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import SortAndFilters from './SortAndFilters/SortAndFilters'

export default function TransactionTable() {
    const {
        data: { transactions }
    } = useContext(DataContext)
    const [sorting, setSorting] = useState<SortMenuOption>('Latest')
    const [filtering, setFiltering] = useState('All transactions')
    const [page, setPage] = useState(1)

    useSortTransactions(transactions, sorting)

    const _transactions =
        filtering === 'All transactions'
            ? transactions
            : transactions.filter((t) => t.category === filtering)
    const pages =
        Math.floor(_transactions.length / 10) +
        (_transactions.length % 10 > 0 ? 1 : 0)
    const paginatedTransactions: Transaction[][] = []
    for (let p = 0; p < pages; p++) {
        paginatedTransactions.push(_transactions.slice(10 * p, 10 * p + 10))
    }

    return (
        <div
            className={clsx(
                'px-5 py-6 mobile:max-tablet:p-8 tablet:p-8',
                'flex flex-col gap-6',
                'bg-pfa-white',
                'rounded-xl'
            )}
        >
            <SortAndFilters
                onSortChange={setSorting}
                onFilterChange={setFiltering}
            />
            <Body transactions={paginatedTransactions[page - 1]} />
            {paginatedTransactions.length > 1 && (
                <Footer pages={pages} onPageChange={setPage} />
            )}
        </div>
    )
}
