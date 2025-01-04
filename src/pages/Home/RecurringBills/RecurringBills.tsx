import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import clsx from 'clsx'
import { useNavigate } from 'react-router'
import useRecurringBillsData from '../../../hooks/useRecurringBillsData'

export default function RecurringBills() {
    const navigate = useNavigate()

    const { paidBillsTotal, upcomingBillsTotal, dueSoonBillsTotal } =
        useRecurringBillsData()

    const recurringBills = [
        paidBillsTotal,
        upcomingBillsTotal,
        dueSoonBillsTotal,
    ]

    return (
        <div
            className={clsx(
                'px-5 py-6 bg-pfa-white rounded-xl',
                'flex flex-col gap-8'
            )}
        >
            <div className='flex flex-row justify-between items-center'>
                <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                    Recurring Bills
                </Text>
                <Button.Tertiary onClick={() => navigate('recurring-bills')}>
                    See Details
                </Button.Tertiary>
            </div>
            <div className='flex flex-col gap-3'>
                {['Paid Bills', 'Total Upcoming', 'Due Soon'].map(
                    (name, index) => (
                        <div
                            key={name}
                            className={clsx(
                                'px-4 py-5 bg-pfa-beige-100 rounded-lg',
                                'flex justify-between items-center',
                                {
                                    'border-l-4 border-pfa-green': index === 0,
                                    'border-l-4 border-pfa-yellow': index === 1,
                                    'border-l-4 border-pfa-cyan': index === 2,
                                }
                            )}
                        >
                            <Text fontSize='sm'>{name}</Text>
                            <Text
                                fontSize='sm'
                                fontStyle='bold'
                                color='pfa-grey-900'
                            >
                                {`$${recurringBills[index].toFixed(2)}`}
                            </Text>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
