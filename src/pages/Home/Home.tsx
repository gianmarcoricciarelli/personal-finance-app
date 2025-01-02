import Card from '@components/Card/Card'
import Text from '@components/Text/Text'
import data from '@data/data.json'
import clsx from 'clsx'
import { Balance } from '../../types'
import Pots from './Pots/Pots'
import Transactions from './Transactions/Transactions'

export default function Home() {
    const summaryItems: Balance = data.balance

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
                        subTitle={'$' + data.balance.current.toString()}
                        isPrimary={index === 0}
                    />
                ))}
            </div>
            <div className={clsx('flex flex-col gap-6')}>
                <Pots />
                <Transactions />
            </div>
        </div>
    )
}
