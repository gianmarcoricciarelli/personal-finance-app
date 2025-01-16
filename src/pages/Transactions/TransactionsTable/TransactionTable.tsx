import DropDown from '@components/DropDown/DropDown'
import SortBy from '@components/DropDown/SortBy/SortBy'
import Input from '@components/Input/Input'
import DataContext from '@contexts/Data/Data.context'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import useSortTransactions from '@hooks/useSortTransactions'
import FilterIcon from '@images/icon-filter-mobile.svg?react'
import SearchIcon from '@images/icon-search.svg?react'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { SortMenuOption } from '../../../types'

function Header({
    onSortChange,
}: {
    onSortChange: Dispatch<SetStateAction<SortMenuOption>>
}) {
    const { isMobile } = useContext(ViewportObserver)

    return isMobile ? (
        <div className='flex items-center gap-6'>
            <Input icon={<SearchIcon />} placeholder='Search transaction' />
            <SortBy onSortOptionChange={onSortChange} />
            <DropDown
                className='left-[unset] right-0 translate-x-0'
                ButtonComponent={<FilterIcon />}
            >
                <span>Hello</span>
            </DropDown>
        </div>
    ) : (
        <div className='flex items-center'>
            <Input icon={<SearchIcon />} placeholder='Search transaction' />
            <div className='flex justify-end items-center gap-6 grow'>
                <SortBy onSortOptionChange={onSortChange} />
            </div>
        </div>
    )
}

export default function TransactionTable() {
    const {
        data: { transactions },
    } = useContext(DataContext)
    const [sorting, setSorting] = useState<SortMenuOption>('Latest')

    useSortTransactions(transactions, sorting)

    return (
        <div
            className={clsx(
                'px-5 py-6 tablet:p-8 desktop:p-8',
                'flex flex-col gap-6',
                'bg-pfa-white',
                'rounded-xl'
            )}
        >
            <Header onSortChange={setSorting} />
        </div>
    )
}
