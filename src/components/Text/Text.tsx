import clsx from 'clsx'
import { ComponentProps } from 'react'
import { Color, FontSize, FontStyle } from '../../types'

export interface TextProps extends ComponentProps<'span'> {
    fontSize?: FontSize
    fontStyle?: FontStyle
    color?: Color
}

export default function Text({
    className,
    fontSize = 'xs',
    fontStyle = 'normal',
    color = 'pfa-grey-500',
    children,
}: TextProps) {
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
                    'font-normal': fontStyle === 'normal',
                },
                `text-${color}`
            )}
        >
            {children}
        </span>
    )
}
