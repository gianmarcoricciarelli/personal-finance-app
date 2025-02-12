import Input from '@components/Input/Input'
import Text from '@components/Text/Text'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import useRecurringBillsData from '@hooks/useRecurringBillsData'
import SearchIcon from '@icons/icon-search.svg?react'
import SortIcon from '@icons/icon-sort-mobile.svg?react'
import clsx from 'clsx'
import { ChangeEventHandler, Fragment, useContext, useState } from 'react'
import { SortMenuOption, Transaction } from '../../../types'
import Bill from './Bill/Bill'
import SortBills from './SortBills/SortBills'

export default function Bills() {
    const { isMobile } = useContext(ViewportObserver)
    const { paidBills, dueSoonBills } = useRecurringBillsData()

    const [sorting, setSorting] = useState<SortMenuOption>('Latest')
    const [searchText, setSearchText] = useState('')

    let bills = [...paidBills, ...dueSoonBills].reduce(
        (prev: Transaction[], curr: Transaction) => {
            if (prev.map((p) => p.name).includes(curr.name)) {
                const prev_index = prev.findIndex((p) => p.name === curr.name)
                if (
                    Number(new Date(curr!.date)) >
                    Number(new Date(prev[prev_index]!.date))
                ) {
                    prev[prev_index] = curr
                }
            } else {
                prev.push(curr)
            }

            return prev
        },
        [] as Transaction[]
    )
    bills =
        searchText !== ''
            ? bills.filter((b) =>
                  b.name.toLowerCase().includes(searchText.toLowerCase())
              )
            : bills
    bills.sort((a, b) => {
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

    const onSearchBill: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <div
            className={clsx(
                'px-5 py-6 mobile:max-tablet:p-8 tablet:p-8',
                'bg-pfa-white rounded-xl',
                'flex flex-col gap-6 tablet:grow-[0.75]'
            )}
        >
            <div className='flex items-center gap-6'>
                <Input
                    containerClassName='grow mobile:max-tablet:grow-0 mobile:max-tablet:w-1/2 tablet:grow-0 tablet:w-1/2'
                    placeholder='Search bills'
                    icon={<SearchIcon />}
                    onChange={onSearchBill}
                />
                <div className='mobile:max-tablet:w-1/2 tablet:w-1/2 flex mobile:max-tablet:justify-end tablet:justify-end'>
                    {isMobile && (
                        <SortIcon
                            className={clsx({
                                'rotate-180': sorting === 'Oldest'
                            })}
                            onClick={() =>
                                setSorting((prevSorting) =>
                                    prevSorting === 'Latest'
                                        ? 'Oldest'
                                        : 'Latest'
                                )
                            }
                        />
                    )}
                    {!isMobile && <SortBills onSortOptionChange={setSorting} />}
                </div>
            </div>
            {bills.length > 0 && (
                <div
                    className={clsx(
                        'flex flex-col gap-5',
                        'mobile:max-tablet:grid mobile:max-tablet:grid-cols-bills-table tablet:grid tablet:grid-cols-bills-table'
                    )}
                >
                    {!isMobile && (
                        <>
                            <Text>Bill Title</Text>
                            <Text>Due Date</Text>
                            <Text>Amount</Text>
                        </>
                    )}
                    {bills.map((b, index) =>
                        isMobile ? (
                            <div
                                key={index}
                                className={clsx('flex flex-col gap-5')}
                            >
                                <Bill.Composite
                                    isPaid={
                                        paidBills.find(
                                            (pb) =>
                                                pb.name === b.name &&
                                                pb.date === b.date
                                        )
                                            ? true
                                            : false
                                    }
                                    {...b}
                                />
                                {index !== bills.length - 1 && (
                                    <div className='h-[1px] bg-pfa-grey-100' />
                                )}
                            </div>
                        ) : (
                            <Fragment key={index}>
                                <Bill.Title avatar={b.avatar} name={b.name} />
                                <Bill.DueDate
                                    isPaid={
                                        paidBills.find(
                                            (pb) =>
                                                pb.name === b.name &&
                                                pb.date === b.date
                                        )
                                            ? true
                                            : false
                                    }
                                    date={b.date}
                                />
                                <Text
                                    fontSize='sm'
                                    fontStyle='bold'
                                    color='pfa-grey-900'
                                >
                                    {`$${Math.abs(b.amount).toFixed(2)}`}
                                </Text>
                                {index !== bills.length - 1 && (
                                    <div className='h-[1px] bg-pfa-grey-100 col-span-full' />
                                )}
                            </Fragment>
                        )
                    )}
                </div>
            )}
            {bills.length === 0 && (
                <div className='h-full flex justify-center items-center'>
                    <Text
                        fontSize='xl'
                        fontStyle='bold'
                        color='pfa-grey-900'
                    >{`No results for "${searchText}"`}</Text>
                </div>
            )}
        </div>
    )
}
