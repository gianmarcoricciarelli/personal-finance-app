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
                className={clsx({
                    'text-pfa-white': isPrimary,
                    'text-pfa-grey-500': !isPrimary,
                })}
                fontSize='sm'
            >
                {title}
            </Text>
            <Text
                className={clsx({
                    'text-pfa-white': isPrimary,
                    'text-pfa-grey-900': !isPrimary,
                })}
                fontSize='xxl'
            >
                {subTitle}
            </Text>
        </div>
    )
}
