import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import TextBox from '@components/TextBox/TextBox'
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
                <Button.Tertiary onClick={() => navigate('/transactions')}>
                    View All
                </Button.Tertiary>
            </div>
            <div className='flex flex-col gap-3'>
                {_transactions.map((transaction, index) => (
                    <>
                        <div className='flex flex-row justify-between'>
                            <div className='h-10 flex flex-row items-center gap-4'>
                                <div className='w-8 h-8'>
                                    <img
                                        className='rounded-full'
                                        src={`./src/${transaction.avatar.slice(
                                            2
                                        )}`}
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
                            <TextBox.WithSubText
                                className='text-end'
                                title={
                                    <TextBox.Text
                                        fontSize='sm'
                                        fontStyle='bold'
                                        color={
                                            transaction.amount > 0
                                                ? 'pfa-green'
                                                : 'pfa-grey-900'
                                        }
                                    >
                                        {transaction.amount > 0
                                            ? `+$${transaction.amount.toFixed(
                                                  2
                                              )}`
                                            : `-$${Math.abs(
                                                  transaction.amount
                                              ).toFixed(2)}`}
                                    </TextBox.Text>
                                }
                                subTitle={
                                    <TextBox.Text>
                                        {new Date(transaction.date)
                                            .toDateString()
                                            .slice(4)}
                                    </TextBox.Text>
                                }
                            />
                        </div>
                        {index < _transactions.length - 1 && (
                            <div className='h-[1px] bg-pfa-grey-100' />
                        )}
                    </>
                ))}
            </div>
        </div>
    )
}
