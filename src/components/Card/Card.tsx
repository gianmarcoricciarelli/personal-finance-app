import Text from '@components/Text/Text'
import clsx from 'clsx'
import { ReactElement } from 'react'

interface Card {
    title: string
    subTitle: string
    icon?: ReactElement
    isPrimary?: boolean
}

export default function Card({ title, subTitle, icon, isPrimary }: Card) {
    return (
        <div
            className={clsx(
                'p-5 rounded-xl sm:p-6',
                'flex items-center gap-5 sm:grow',
                {
                    'px-5 py-6 sm:grow-0': icon,
                    'bg-pfa-grey-900': isPrimary,
                    'bg-pfa-white': !isPrimary,
                }
            )}
        >
            {icon && icon}
            <div className='flex flex-col gap-3'>
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
        </div>
    )
}
