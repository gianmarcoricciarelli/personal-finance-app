import Text from '@components/Text/Text'
import clsx from 'clsx'
import { ChangeEventHandler, forwardRef, ReactNode, Ref } from 'react'

interface Input {
    id: string
    name: string
    type?: string
    defaultValue?: string | number
    placeholder?: string
    value?: string
    readOnly?: boolean
    maxLength?: number
    label: string
    prefix?: ReactNode
    icon?: ReactNode
    helperText?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    onClick?: () => void
}

const Input = forwardRef<Ref<HTMLElement>, Input>(function Input(
    {
        id,
        name,
        type,
        defaultValue,
        placeholder,
        value,
        readOnly,
        maxLength,
        label,
        prefix,
        icon,
        helperText,
        onChange,
        onClick,
    }: Input,
    ref
) {
    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={id} className='text-xs font-bold text-pfa-grey-500'>
                {label}
            </label>
            <div
                ref={ref as Ref<HTMLDivElement>}
                className='px-5 py-3 flex gap-3 items-center border-[1px] border-pfa-beige-500 rounded-lg'
                onClick={onClick}
            >
                {prefix && prefix}
                <input
                    className={clsx(
                        'text-sm text-pfa-grey-900',
                        'placeholder:text-sm placeholder:text-pfa-beige-500 outline-none',
                        'grow'
                    )}
                    id={id}
                    name={name}
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    onChange={onChange}
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
})

export default Input
