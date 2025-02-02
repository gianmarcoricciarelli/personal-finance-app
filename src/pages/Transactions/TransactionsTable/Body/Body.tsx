import Text from '@components/Text/Text'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import { useContext } from 'react'
import { Transaction as TransactionType } from '../../../../types'
import Transaction from '../Transaction/Transaction'

export default function Body({
    transactions,
}: {
    transactions: TransactionType[]
}) {
    const { isMobile } = useContext(ViewportObserver)

    return (
        <>
            {isMobile && (
                <div className='h-[697px] flex flex-col gap-4'>
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
                <div className='grid grid-cols-transactions-table grid-rows-transactions-table items-center'>
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
