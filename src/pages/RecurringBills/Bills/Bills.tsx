import DropDown from '@components/DropDown/DropDown'
import Input from '@components/Input/Input'
import Text from '@components/Text/Text'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import useRecurringBillsData from '@hooks/useRecurringBillsData'
import SearchIcon from '@images/icon-search.svg?react'
import SortIcon from '@images/icon-sort-mobile.svg?react'
import clsx from 'clsx'
import {
    ComponentPropsWithoutRef,
    forwardRef,
    Ref,
    useContext,
    useState,
} from 'react'
import { Transaction } from '../../../types'
import Bill from './Bill/Bill'

const DropDownButton = forwardRef<
    Ref<HTMLElement>,
    ComponentPropsWithoutRef<'div'>
>(function DropDownButton({ onClick }, ref) {
    return (
        <div
            ref={ref as Ref<HTMLDivElement>}
            className={clsx(
                'px-5 py-3',
                'flex items-center gap-4',
                'rounded-lg',
                'border-[1px] border-pfa-beige-500',
                'hover:cursor-pointer'
            )}
            onClick={onClick}
        >
            <Text fontSize='sm' color='pfa-grey-900'>
                Latest
            </Text>
        </div>
    )
})

export default function Bills() {
    const { isMobile } = useContext(ViewportObserver)
    const { paidBills, dueSoonBills } = useRecurringBillsData()

    const [sorting, setSorting] = useState<'ASC' | 'DESC'>('ASC')

    const bills = [...paidBills, ...dueSoonBills].reduce(
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
    bills.sort((a, b) =>
        sorting === 'ASC'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
    )

    return (
        <div
            className={clsx(
                'px-5 py-6 tablet:p-8 desktop:p-8',
                'bg-pfa-white rounded-xl',
                'flex flex-col gap-6 desktop:grow-[0.75]'
            )}
        >
            <div className='flex items-center gap-6'>
                <Input
                    containerClassName='grow tablet:grow-0 tablet:w-1/2 desktop:grow-0 desktop:w-1/2'
                    placeholder='Search bills'
                    icon={<SearchIcon />}
                />
                <div className='tablet:w-1/2 desktop:w-1/2 flex tablet:justify-end desktop:justify-end'>
                    {isMobile && (
                        <SortIcon
                            className={clsx({
                                'rotate-180': sorting === 'DESC',
                            })}
                            onClick={() =>
                                setSorting((prevSorting) =>
                                    prevSorting === 'ASC' ? 'DESC' : 'ASC'
                                )
                            }
                        />
                    )}
                    {!isMobile && (
                        <div className='flex items-center gap-2'>
                            <Text fontSize='sm'>Sort by</Text>
                            <DropDown ButtonComponent={<DropDownButton />}>
                                <span>Hello</span>
                            </DropDown>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                {bills.map((b, index) => (
                    <div key={index} className='flex flex-col gap-5'>
                        <Bill
                            isPaid={
                                paidBills.find(
                                    (pb) =>
                                        pb.name === b.name && pb.date === b.date
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
                ))}
            </div>
        </div>
    )
}
