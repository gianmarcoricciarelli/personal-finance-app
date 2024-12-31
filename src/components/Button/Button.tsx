import CaretRightIcon from '@images/icon-caret-right.svg?react'
import { ReactNode } from 'react'

interface Button {
    variant: 'primary' | 'secondary' | 'tertiary' | 'destroy'
    onClick: () => void
    children: ReactNode
}

export default function Button({ variant, onClick, children }: Button) {
    const buttonText = (
        <span className='text-sm text-pfa-grey-500 group-hover:text-pfa-grey-900 transition-colors duration-300'>
            {children}
        </span>
    )

    let className = 'group'
    if (variant === 'tertiary') {
        className += ' flex flex-row gap-3 items-center'
    }

    return (
        <button className={className} onClick={onClick}>
            {buttonText}
            {variant === 'tertiary' && (
                <CaretRightIcon className='w-3 h-3 text-pfa-grey-500 group-hover:text-pfa-grey-900 transition-colors duration-300' />
            )}
        </button>
    )
}
