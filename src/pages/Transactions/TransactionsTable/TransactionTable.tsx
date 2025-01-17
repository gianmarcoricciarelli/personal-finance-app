import FilterBy from '@components/DropDown/FilterBy/FilterBy'
import SortBy from '@components/DropDown/SortBy/SortBy'
import Input from '@components/Input/Input'
import Text from '@components/Text/Text'
import DataContext from '@contexts/Data/Data.context'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import useSortTransactions from '@hooks/useSortTransactions'
import SearchIcon from '@images/icon-search.svg?react'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { SortMenuOption, Transaction as TransactionType } from '../../../types'
import Transaction from './Transaction/Transaction'

function SortAndFilters({
    onSortChange,
    onFilterChange,
}: {
    onSortChange: Dispatch<SetStateAction<SortMenuOption>>
    onFilterChange: Dispatch<SetStateAction<string>>
}) {
    const { isMobile } = useContext(ViewportObserver)

    return isMobile ? (
        <div className='flex items-center gap-6'>
            <Input icon={<SearchIcon />} placeholder='Search transaction' />
            <SortBy onSortOptionChange={onSortChange} />
            <FilterBy onFilterOptionChange={onFilterChange} />
        </div>
    ) : (
        <div className='flex items-center'>
            <Input icon={<SearchIcon />} placeholder='Search transaction' />
            <div className='flex justify-end items-center gap-6 grow'>
                <SortBy onSortOptionChange={onSortChange} />
                <FilterBy onFilterOptionChange={onFilterChange} />
            </div>
        </div>
    )
}

function Body({ transactions }: { transactions: TransactionType[] }) {
    const { isMobile } = useContext(ViewportObserver)

    return (
        <>
            {isMobile && (
                <div className='flex flex-col gap-4'>
                    {transactions.map((t, index) => (
                        <>
                            <Transaction.Composite {...t} />
                            {index !== transactions.length - 1 && (
                                <div
                                    key={`delimiter-${index}`}
                                    className='h-[1px] bg-pfa-beige-100'
                                />
                            )}
                        </>
                    ))}
                </div>
            )}
            {!isMobile && (
                <div className='grid grid-cols-transactions-table items-center gap-4'>
                    <Text>Recipient / Sender</Text>
                    <Text>Category</Text>
                    <Text>Transaction Date</Text>
                    <Text className='text-end'>Amount</Text>
                    <div className='h-[1px] bg-pfa-beige-100 col-span-full' />
                    {transactions.map((t, index) => {
                        const _date = new Date(t.date)
                        const month = _date.toDateString().split(' ')[1]
                        const formattedDate = `${_date.getDate()} ${month} ${_date.getFullYear()}, ${_date.getHours()}:${_date.getSeconds()}`

                        return (
                            <>
                                <Transaction.RecipientOrSender
                                    name={t.name}
                                    avatar={t.avatar}
                                />
                                <Text>{t.category}</Text>
                                <Text>{formattedDate}</Text>
                                <Text
                                    className='text-end'
                                    fontSize='sm'
                                    fontStyle='bold'
                                    color='pfa-grey-900'
                                >
                                    {(t.amount < 0 ? '-' : '') +
                                        '$' +
                                        Math.abs(t.amount).toFixed(2)}
                                </Text>
                                {index !== transactions.length - 1 && (
                                    <div className='h-[1px] bg-pfa-beige-100 col-span-full' />
                                )}
                            </>
                        )
                    })}
                </div>
            )}
        </>
    )
}

function Footer({ pages }: { pages: number }) {
    const { isMobile } = useContext(ViewportObserver)

    const [selectedPage, setSelectedPage] = useState('1')

    let pageNumbers: string[] = []
    if (isMobile) {
        switch (selectedPage) {
            case '1':
            case '2':
                pageNumbers = ['1', '2', '...', pages.toString()]
                break
            case (pages - 1).toString():
                pageNumbers = [
                    '1',
                    '...',
                    (pages - 1).toString(),
                    pages.toString(),
                ]
                break
            default:
                pageNumbers = ['...', selectedPage, '...', pages.toString()]
                break
        }
    } else if (pages > 5) {
        switch (selectedPage) {
            case '1':
            case '2':
            case (pages - 1).toString():
            case pages.toString():
                pageNumbers = [
                    '1',
                    '2',
                    '...',
                    (pages - 1).toString(),
                    pages.toString(),
                ]
                break
            default:
                pageNumbers = [
                    '1',
                    '...',
                    selectedPage,
                    '...',
                    pages.toString(),
                ]
        }
    } else {
        pageNumbers = ['1', '2', '3', '4', '5']
    }

    return (
        <div className='pt-6 flex'>
            <span>P</span>
            <div className='flex gap-2'>
                {pageNumbers.map((pageNumber, index) => (
                    <div
                        key={index}
                        className={clsx(
                            'h-10 w-10 transition-colors duration-300',
                            'flex justify-center items-center',
                            'rounded-lg',
                            'group hover:cursor-pointer',
                            {
                                'bg-pfa-white border-[1px] border-pfa-beige-500 hover:bg-pfa-beige-500 hover:border-0':
                                    selectedPage !== pageNumber,
                                'bg-pfa-grey-900': selectedPage === pageNumber,
                            }
                        )}
                        onClick={
                            pageNumber !== '...'
                                ? () => setSelectedPage(pageNumber)
                                : undefined
                        }
                    >
                        <Text
                            className={clsx('transition-colors duration-300', {
                                'group-hover:text-pfa-white':
                                    selectedPage !== pageNumber,
                            })}
                            fontSize='sm'
                            color={
                                selectedPage === pageNumber
                                    ? 'pfa-white'
                                    : 'pfa-grey-900'
                            }
                        >
                            {pageNumber}
                        </Text>
                    </div>
                ))}
            </div>
            <span>N</span>
        </div>
    )
}

export default function TransactionTable() {
    const {
        data: { transactions },
    } = useContext(DataContext)
    const [sorting, setSorting] = useState<SortMenuOption>('Latest')
    const [filtering, setFiltering] = useState('All transactions')

    useSortTransactions(transactions, sorting)

    const _transactions =
        filtering === 'All transactions'
            ? transactions
            : transactions.filter((t) => t.category === filtering)
    const pages =
        Math.floor(_transactions.length / 10) +
        (_transactions.length % 10 > 0 ? 1 : 0)

    return (
        <div
            className={clsx(
                'px-5 py-6 tablet:p-8 desktop:p-8',
                'flex flex-col gap-6',
                'bg-pfa-white',
                'rounded-xl'
            )}
        >
            <SortAndFilters
                onSortChange={setSorting}
                onFilterChange={setFiltering}
            />
            <Body transactions={_transactions} />
            <Footer pages={pages} />
        </div>
    )
}
