import Card from '@components/Card/Card'
import Text from '@components/Text/Text'
import RecurringBillsIcon from '@images/icon-recurring-bills.svg?react'
import clsx from 'clsx'
import useRecurringBillsData from '../../hooks/useRecurringBillsData'
import Bills from './Bills/Bills'
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
            <div className='flex flex-col lg:flex-row gap-6'>
                <div className='flex flex-col gap-3 xs:flex-row xs:gap-6 sm:flex-row sm:gap-6 md:flex-col md:gap-6'>
                    <Card
                        className='sm:w-1/2'
                        title='Total Bills'
                        subTitle={`$${(
                            upcomingBillsTotal + dueSoonBillsTotal
                        ).toFixed(2)}`}
                        icon={<RecurringBillsIcon />}
                        isPrimary
                    />
                    <Summary />
                </div>
                <Bills />
            </div>
        </div>
    )
}
