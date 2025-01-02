import Button from '@components/Button/Button'
import Label from '@components/Label/Label'
import Text from '@components/Text/Text'
import data from '@data/data.json'
import clsx from 'clsx'
import { useNavigate } from 'react-router'
import { Transaction } from '../../../types'

const TRANSACTIONS_IN_PREVIEW = 5

export default function Transactions() {
    const navigate = useNavigate()

    const _transactions: Transaction[] = data.transactions.slice(
        0,
        TRANSACTIONS_IN_PREVIEW
    )

    return (
        <div
            className={clsx(
                'px-5 py-6 rounded-xl bg-pfa-white',
                'flex flex-col gap-8'
            )}
        >
            <div className='flex justify-between'>
                <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                    Transactions
                </Text>
                <Button
                    variant='tertiary'
                    onClick={() => navigate('/transactions')}
                >
                    View All
                </Button>
            </div>
            <div className='flex flex-col gap-3'>
                {_transactions.map((transaction) => (
                    <div
                        key={`${transaction.name} -- ${transaction.category} -- ${transaction.amount}`}
                        className='flex flex-row justify-between'
                    >
                        <div className='h-10 flex flex-row items-center gap-4'>
                            <div className='w-8 h-8'>
                                <img
                                    className='rounded-full'
                                    src={`./src/${transaction.avatar.slice(2)}`}
                                    alt={`${transaction.name}'s Transaction`}
                                />
                            </div>
                            <Text
                                fontSize='sm'
                                fontStyle='bold'
                                color='pfa-grey-900'
                            >
                                {transaction.name}
                            </Text>
                        </div>
                        <Label
                            className='text-end'
                            title={{
                                text:
                                    transaction.amount > 0
                                        ? `+$${transaction.amount.toFixed(2)}`
                                        : `-$${Math.abs(
                                              transaction.amount
                                          ).toFixed(2)}`,
                                fontSize: 'sm',
                                fontStyle: 'bold',
                                color:
                                    transaction.amount > 0
                                        ? 'pfa-green'
                                        : 'pfa-grey-900',
                            }}
                            subTitle={{
                                text: new Date(transaction.date)
                                    .toDateString()
                                    .slice(4),
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
