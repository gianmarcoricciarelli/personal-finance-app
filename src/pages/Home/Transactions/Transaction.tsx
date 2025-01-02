import Button from '@components/Button/Button'
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
                <span className='text-pfa-grey-900 text-xl font-bold'>
                    Transactions
                </span>
                <Button
                    variant='tertiary'
                    onClick={() => navigate('/transactions')}
                >
                    View All
                </Button>
            </div>
            <div className='flex flex-col gap-3'>
                {_transactions.map((transaction) => (
                    <p>{transaction.name}</p>
                ))}
            </div>
        </div>
    )
}
