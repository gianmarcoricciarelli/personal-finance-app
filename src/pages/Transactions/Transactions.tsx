import Text from '@components/Text/Text'
import clsx from 'clsx'
import TransactionTable from './TransactionsTable/TransactionTable'

export default function Transactions() {
    return (
        <div
            className={clsx(
                'px-4 mobile:max-tablet:px-10 tablet:px-10 py-6 mobile:max-tablet:py-8 tablet:py-8',
                'flex flex-col gap-8 grow',
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
