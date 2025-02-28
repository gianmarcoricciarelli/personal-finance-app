import Card from '@components/Card/Card'
import Text from '@components/Text/Text'
import DataContext from '@contexts/Data/Data.context'
import clsx from 'clsx'
import { useContext } from 'react'
import { Balance } from '../../types'
import Budgets from './Budgets/Budgets'
import Pots from './Pots/Pots'
import RecurringBills from './RecurringBills/RecurringBills'
import Transactions from './Transactions/Transactions'

export default function Home() {
    const { data } = useContext(DataContext)

    const summaryItems = data.balance

    return (
        <div
            className={clsx(
                'px-4 py-6 bg-pfa-beige-100 sm:px-10 sm:py-8',
                'flex flex-col gap-8 sm:gap-8 md:grow'
            )}
        >
            <Text fontSize='xxl' fontStyle='bold' color='pfa-grey-900'>
                Overview
            </Text>
            <div className='flex flex-col gap-3 sm:flex-row sm:gap-6'>
                {Object.keys(summaryItems).map((balanceKey, index) => (
                    <Card
                        key={balanceKey}
                        title={
                            (balanceKey as keyof Balance) !== 'expenses' &&
                            (balanceKey as keyof Balance) !== 'income'
                                ? 'Current Balance'
                                : balanceKey[0].toUpperCase() +
                                  balanceKey.slice(1)
                        }
                        subTitle={
                            '$' +
                            data.balance[
                                balanceKey as keyof Balance
                            ].toLocaleString(undefined, {
                                minimumFractionDigits: 2
                            })
                        }
                        isPrimary={index === 0}
                    />
                ))}
            </div>
            <div className='flex flex-col gap-6 md:flex-row'>
                <div className='flex flex-col gap-6 md:grow'>
                    <Pots />
                    <Transactions />
                </div>
                <div className='flex flex-col gap-6'>
                    <Budgets />
                    <RecurringBills />
                </div>
            </div>
        </div>
    )
}
