import Text from '@components/Text/Text'
import CaretRightIcon from '@images/icon-caret-right.svg?react'
import clsx from 'clsx'
import { ComponentProps, ReactElement } from 'react'

function Primary({
    className,
    type,
    onClick,
    children,
}: ComponentProps<'button'>) {
    return (
        <button
            className={clsx(
                className,
                'p-4 rounded-lg bg-pfa-grey-900 transition-colors duration-300 hover:bg-pfa-beige-500'
            )}
            onClick={onClick}
            type={type}
        >
            <Text fontSize='sm' fontStyle='bold' color='pfa-white'>
                {children}
            </Text>
        </button>
    )
}

function Secondary({ className, onClick, children }: ComponentProps<'button'>) {
    return (
        <button
            className={clsx(
                className,
                'p-4 rounded-lg bg-pfa-beige-100 transition-all duration-300 hover:bg-pfa-white hover:shadow-sm-solid-pfa-beige-500'
            )}
            onClick={onClick}
        >
            <Text
                className='whitespace-nowrap'
                fontSize='sm'
                fontStyle='bold'
                color='pfa-grey-900'
            >
                {children}
            </Text>
        </button>
    )
}

function Tertiary({
    noIcon,
    onClick,
    children,
}: ComponentProps<'button'> & { noIcon?: boolean }) {
    const buttonText = (
        <Text
            fontSize='sm'
            className='group-hover:text-pfa-grey-900 transition-colors duration-300'
        >
            {children}
        </Text>
    )

    return (
        <button
            className='group flex flex-row items-center gap-3'
            onClick={onClick}
        >
            {buttonText}
            {!noIcon && (
                <CaretRightIcon className='w-3 h-3 text-pfa-grey-500 group-hover:text-pfa-grey-900 transition-colors duration-300' />
            )}
        </button>
    )
}

function Destroy({ className, onClick, children }: ComponentProps<'button'>) {
    const buttonText = (
        <Text fontSize='sm' fontStyle='bold' color='pfa-white'>
            {children}
        </Text>
    )

    return (
        <button
            className={clsx(
                className,
                'p-4 rounded-lg bg-pfa-red hover:bg-pfa-red/80 transition-colors duration-300'
            )}
            onClick={onClick}
        >
            {buttonText}
        </button>
    )
}

interface PaginationProps extends ComponentProps<'button'> {
    leftIcon?: ReactElement
    rightIcon?: ReactElement
}

function Pagination({
    leftIcon,
    rightIcon,
    onClick,
    children,
}: PaginationProps) {
    return (
        <button
            className={clsx(
                'transition-colors duration-300 group rounded-lg border-[1px] border-pfa-beige-500 bg-pfa-white h-10 p-4',
                'flex items-center gap-4',
                'hover:bg-pfa-beige-500'
            )}
            onClick={onClick}
        >
            {leftIcon && leftIcon}
            {children}
            {rightIcon && rightIcon}
        </button>
    )
}

const Button = {
    Primary,
    Secondary,
    Tertiary,
    Destroy,
    Pagination,
}

export default Button
