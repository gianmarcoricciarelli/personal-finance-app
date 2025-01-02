import Text from '@components/Text/Text'
import clsx from 'clsx'

interface Card {
    title: string
    subTitle: string
    isPrimary?: boolean
}

export default function Card({ title, subTitle, isPrimary }: Card) {
    return (
        <div
            className={clsx(
                'p-5 rounded-xl sm:p-6',
                'flex flex-col gap-3 sm:grow',
                {
                    'bg-pfa-grey-900': isPrimary,
                    'bg-pfa-white': !isPrimary,
                }
            )}
        >
            <Text
                fontSize='sm'
                color={isPrimary ? 'pfa-white' : 'pfa-grey-500'}
            >
                {title}
            </Text>
            <Text
                fontSize='xxl'
                color={isPrimary ? 'pfa-white' : 'pfa-grey-900'}
            >
                {subTitle}
            </Text>
        </div>
    )
}
