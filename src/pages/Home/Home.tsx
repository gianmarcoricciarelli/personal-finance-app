import Card from '@components/Card/Card'
import clsx from 'clsx'
import data from '../../data.json'
import { Balance } from '../../types'
import Pots from './Pots/Pots'

export default function Home() {
    const summaryItems: Balance = data.balance

    return (
        <div
            className={clsx(
                'px-4 py-6 bg-pfa-beige-100 sm:px-10 sm:py-8',
                'flex flex-col gap-8 sm:gap-8 md:grow'
            )}
        >
            <span className='text-[32px] text-pfa-grey-900 font-bold'>
                Overview
            </span>
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
            <div className={clsx('flex flex-col gap-6 sm:flex-row')}>
                <Pots />
            </div>
        </div>
    )
}
