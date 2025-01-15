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

function Title({ avatar, name }: { avatar: string; name: string }) {
    return (
        <div className='flex gap-4 items-center'>
            <img
                className='w-8 h-8 rounded-full'
                src={`src${avatar.slice(1)}`}
                alt='aaaa'
            />
            <Text fontSize='sm' fontStyle='bold' color='pfa-grey-900'>
                {name}
            </Text>
        </div>
    )
}

function DueDate({ isPaid, date }: { isPaid: boolean; date: string }) {
    return (
        <div className='flex items-center gap-2'>
            <Text color={isPaid ? 'pfa-green' : 'pfa-red'}>
                {`Monthly - ${new Date(date).getDate()}${dateDayToOrdinal(
                    date
                )}`}
            </Text>
            {isPaid ? <IconBillPaid /> : <IconBillDue />}
        </div>
    )
}

interface CompositeProps extends Omit<Transaction, 'category'> {
    isPaid: boolean
}

function Composite({ avatar, name, date, amount, isPaid }: CompositeProps) {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-4 items-center'>
                <Title avatar={avatar} name={name} />
            </div>
            <div className='flex justify-between'>
                <DueDate isPaid={isPaid} date={date} />
                <Text fontSize='sm' fontStyle='bold' color='pfa-grey-900'>
                    {`$${Math.abs(amount).toFixed(2)}`}
                </Text>
            </div>
        </div>
    )
}

const Bill = {
    Title,
    DueDate,
    Composite,
}

export default Bill
