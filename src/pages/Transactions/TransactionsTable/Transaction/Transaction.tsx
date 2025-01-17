import Text from '@components/Text/Text'
import useFormatDate from '@hooks/useFormatDate'

function RecipientOrSender({
    avatar,
    name,
    category,
}: {
    avatar: string
    name: string
    category?: string
}) {
    return (
        <div className='flex gap-3 items-center'>
            <img
                className='w-5 tablet:w-10 desktop:w-10 h-5 tablet:h-10 desktop:h-10 rounded-full'
                src={'src' + avatar.slice(1)}
                alt='aaa'
            />
            <div className='flex flex-col gap-1'>
                <Text fontSize='sm' fontStyle='bold' color='pfa-grey-900'>
                    {name}
                </Text>
                {category && <Text>{category}</Text>}
            </div>
        </div>
    )
}

function Composite({
    amount,
    avatar,
    category,
    date,
    name,
}: {
    avatar: string
    name: string
    category: string
    date: string
    amount: number
}) {
    const formattedDate = useFormatDate(date)

    return (
        <div className='flex items-center justify-between'>
            <RecipientOrSender
                avatar={avatar}
                name={name}
                category={category}
            />
            <div className='flex flex-col gap-1 text-end'>
                <Text fontSize='sm' fontStyle='bold' color='pfa-grey-900'>
                    {(amount < 0 ? '-' : '') +
                        '$' +
                        Math.abs(amount).toFixed(2)}
                </Text>
                <Text className='whitespace-nowrap'>{formattedDate}</Text>
            </div>
        </div>
    )
}

const Transaction = {
    RecipientOrSender,
    Composite,
}

export default Transaction
