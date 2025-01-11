import Card from '@components/Card/Card'
import Text from '@components/Text/Text'
import RecurringBillsIcon from '@images/icon-recurring-bills.svg?react'
import clsx from 'clsx'
import useRecurringBillsData from '../../hooks/useRecurringBillsData'
import Summary from './Summary/Summary'

export default function RecurringBills() {
    const { dueSoonBillsTotal, upcomingBillsTotal } = useRecurringBillsData()

    return (
        <div
            className={clsx(
                'px-4 py-6 bg-pfa-beige-100',
                'flex flex-col gap-5 grow'
            )}
        >
            <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                Recurring Bills
            </Text>
            <div className='flex flex-col xs:flex-row md:flex-col gap-3 xs:gap-6 md:gap-6'>
                <Card
                    title='Total Bills'
                    subTitle={`$${(
                        upcomingBillsTotal + dueSoonBillsTotal
                    ).toFixed(2)}`}
                    icon={<RecurringBillsIcon />}
                    isPrimary
                />
                <Summary />
            </div>
        </div>
    )
}
