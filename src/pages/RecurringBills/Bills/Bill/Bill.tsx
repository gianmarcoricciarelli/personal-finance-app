import Text from '@components/Text/Text'
import IconBillDue from '@images/icon-bill-due.svg?react'
import IconBillPaid from '@images/icon-bill-paid.svg?react'
import { Transaction } from '../../../../types'

function dateDayToOrdinal(dateString: string): string {
    const day = new Date(dateString).getDate().toString()

    switch (day) {
        case '1':
            return 'st'
        case '2':
            return 'nd'
        case '3':
            return 'rd'
        default:
            return 'th'
    }
}

interface Bill extends Omit<Transaction, 'category'> {
    isPaid: boolean
}

export default function Bill({ avatar, name, date, amount, isPaid }: Bill) {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-14 items-center'>
                <img
                    className='w-8 h-8 rounded-full'
                    src={`src${avatar.slice(1)}`}
                    alt='aaaa'
                />
                <Text fontSize='sm' fontStyle='bold' color='pfa-grey-900'>
                    {name}
                </Text>
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <Text color={isPaid ? 'pfa-green' : 'pfa-red'}>
                        {`Monthly - ${new Date(
                            date
                        ).getDate()}${dateDayToOrdinal(date)}`}
                    </Text>
                    {isPaid ? <IconBillPaid /> : <IconBillDue />}
                </div>
                <Text fontSize='sm' fontStyle='bold' color='pfa-grey-900'>
                    {Math.abs(amount).toFixed(2)}
                </Text>
            </div>
        </div>
    )
}
