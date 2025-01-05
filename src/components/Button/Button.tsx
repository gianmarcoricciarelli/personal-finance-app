import Text from '@components/Text/Text'
import CaretRightIcon from '@images/icon-caret-right.svg?react'
import clsx from 'clsx'
import { ComponentProps } from 'react'

function Primary({ onClick, children }: ComponentProps<'button'>) {
    return (
        <button
            className='p-4 rounded-lg bg-pfa-grey-900 transition-colors duration-300 hover:bg-pfa-beige-500'
            onClick={onClick}
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
            <Text fontSize='sm' fontStyle='bold' color='pfa-grey-900'>
                {children}
            </Text>
        </button>
    )
}

function Tertiary({ onClick, children }: ComponentProps<'button'>) {
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
            className='group flex flex-row gap-3 items-center'
            onClick={onClick}
        >
            {buttonText}
            <CaretRightIcon className='w-3 h-3 text-pfa-grey-500 group-hover:text-pfa-grey-900 transition-colors duration-300' />
        </button>
    )
}

const Button = {
    Primary,
    Secondary,
    Tertiary,
}

export default Button
