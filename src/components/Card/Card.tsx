import Text from '@components/Text/Text'
import clsx from 'clsx'
import { ComponentProps, ReactElement } from 'react'

interface Card extends ComponentProps<'div'> {
    title: string
    subTitle: string
    layout?: 'vertical' | 'horizontal'
    icon?: ReactElement
    isPrimary?: boolean
}

export default function Card({
    className,
    title,
    subTitle,
    icon,
    isPrimary,
    layout = 'horizontal',
}: Card) {
    return (
        <div
            className={clsx(
                className,
                'p-5 tablet:p-6 desktop:p-6',
                'rounded-xl',
                'flex gap-5 tablet:gap-8 desktop:gap-8',
                {
                    'flex-row items-center': layout === 'horizontal',
                    'flex-col': layout === 'vertical',
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
