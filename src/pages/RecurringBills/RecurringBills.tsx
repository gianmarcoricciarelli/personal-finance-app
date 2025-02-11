import Card from '@components/Card/Card'
import Text from '@components/Text/Text'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import RecurringBillsIcon from '@icons/icon-recurring-bills.svg?react'
import clsx from 'clsx'
import { useContext } from 'react'
import useRecurringBillsData from '../../hooks/useRecurringBillsData'
import Bills from './Bills/Bills'
import Summary from './Summary/Summary'

export default function RecurringBills() {
    const { isMobile } = useContext(ViewportObserver)

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
            <div className='flex flex-col desktop:flex-row gap-6'>
                <div className='flex flex-col tablet:max-desktop:flex-row desktop:flex-col gap-3 tablet:max-desktop:gap-6 desktop:gap-6 desktop:grow-[0.25]'>
                    <Card
                        className='tablet:max-desktop:grow-[0.5]'
                        title='Total Bills'
                        subTitle={`$${(
                            upcomingBillsTotal + dueSoonBillsTotal
                        ).toFixed(2)}`}
                        icon={<RecurringBillsIcon />}
                        layout={isMobile === true ? 'horizontal' : 'vertical'}
                        isPrimary
                    />
                    <Summary />
                </div>
                <Bills />
            </div>
        </div>
    )
}
