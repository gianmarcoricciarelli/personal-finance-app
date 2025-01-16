import Text from '@components/Text/Text'
import clsx from 'clsx'
import TransactionTable from './TransactionsTable/TransactionTable'

export default function Transactions() {
    return (
        <div
            className={clsx(
                'px-4 tablet:px-10 desktop:px-10 py-6 tablet:py-8 desktop:py-8',
                'flex flex-col gap-8',
                'bg-pfa-beige-100'
            )}
        >
            <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                Transactions
            </Text>
            <TransactionTable />
        </div>
    )
}
