import clsx from 'clsx'
import { ReactNode } from 'react'
import { Color, FontSize, FontStyle } from '../../types'

interface Text {
    className?: string
    fontSize?: FontSize
    fontStyle?: FontStyle
    color?: Color
    children: ReactNode
}

export default function Text({
    className,
    fontSize = 'xs',
    fontStyle = 'normal',
    color = 'pfa-grey-500',
    children,
}: Text) {
    return (
        <span
            className={clsx(
                className,
                {
                    'text-xs': fontSize === 'xs',
                    'text-sm': fontSize === 'sm',
                    'text-base': fontSize === 'base',
                    'text-lg': fontSize === 'lg',
                    'text-xl': fontSize === 'xl',
                    'text-[32px]': fontSize === 'xxl',
                    'font-bold': fontStyle === 'bold',
                },
                `text-${color}`
            )}
        >
            {children}
        </span>
    )
}
