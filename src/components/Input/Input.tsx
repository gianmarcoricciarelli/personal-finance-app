import Text from '@components/Text/Text'
import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'

export default function Input({
    id,
    prefixComponent,
    label,
    helperText,
    icon,
    ...props
}: ComponentProps<'input'> & {
    label: string
    prefixComponent?: ReactNode
    icon?: ReactNode
    helperText?: string
}) {
    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={id} className='text-xs font-bold text-pfa-grey-500'>
                {label}
            </label>
            <div className='px-5 py-3 flex gap-3 items-center border-[1px] border-pfa-beige-500 rounded-lg'>
                {prefixComponent && prefixComponent}
                <input
                    id={id}
                    className={clsx(
                        'text-sm text-pfa-grey-900',
                        'placeholder:text-sm placeholder:text-pfa-beige-500 outline-none',
                        'grow'
                    )}
                    {...props}
                />
                {icon && icon}
            </div>
            {helperText && (
                <div className='flex justify-end'>
                    <Text fontSize='xs' color='pfa-grey-500'>
                        {helperText}
                    </Text>
                </div>
            )}
        </div>
    )
}
