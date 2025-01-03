import Text from '@components/Text/Text'
import CaretRightIcon from '@images/icon-caret-right.svg?react'
import { ComponentProps } from 'react'

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
    Tertiary,
}

export default Button
