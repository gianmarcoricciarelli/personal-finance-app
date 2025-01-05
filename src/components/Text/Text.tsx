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
    onClick,
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
                    'text-pfa-beige-100': color === 'pfa-beige-100',
                    'text-pfa-beige-500': color === 'pfa-beige-500',
                    'text-pfa-cyan': color === 'pfa-cyan',
                    'text-pfa-green': color === 'pfa-green',
                    'text-pfa-grey-100': color === 'pfa-grey-100',
                    'text-pfa-grey-300': color === 'pfa-grey-300',
                    'text-pfa-grey-500': color === 'pfa-grey-500',
                    'text-pfa-grey-900': color === 'pfa-grey-900',
                    'text-pfa-red': color === 'pfa-red',
                    'text-pfa-white': color === 'pfa-white',
                    'text-pfa-yellow': color === 'pfa-yellow',
                },
                `text-${color}`
            )}
            onClick={onClick}
        >
            {children}
        </span>
    )
}
