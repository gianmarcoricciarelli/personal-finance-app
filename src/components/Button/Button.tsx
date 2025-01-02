import Text from '@components/Text/Text'
import CaretRightIcon from '@images/icon-caret-right.svg?react'
import { ComponentProps } from 'react'

interface Button extends ComponentProps<'button'> {
    variant: 'primary' | 'secondary' | 'tertiary' | 'destroy'
}

export default function Button({ variant, onClick, children }: Button) {
    const buttonText = (
        <Text
            fontSize='sm'
            className='group-hover:text-pfa-grey-900 transition-colors duration-300'
        >
            {children}
        </Text>
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
