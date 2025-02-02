import Text from '@components/Text/Text'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef, ReactNode, Ref } from 'react'

interface Input extends Omit<ComponentPropsWithoutRef<'input'>, 'prefix'> {
    label?: string
    containerClassName?: string
    prefix?: ReactNode
    icon?: ReactNode
    helperText?: string
    error?: string
}

const Input = forwardRef<Ref<HTMLElement>, Input>(function Input(
    {
        label,
        containerClassName,
        prefix,
        icon,
        helperText,
        error,
        ...props
    }: Input,
    ref
) {
    return (
        <div
            className={clsx(containerClassName, 'min-w-0 flex flex-col gap-1')}
        >
            {label && (
                <label
                    htmlFor={props.id}
                    className='text-xs font-bold text-pfa-grey-500'
                >
                    {label}
                </label>
            )}
            <div
                ref={ref as Ref<HTMLDivElement>}
                className='px-5 py-3 flex gap-3 items-center border-[1px] border-pfa-beige-500 rounded-lg'
                onClick={props.onClick}
            >
                {prefix && prefix}
                <input
                    className={clsx(
                        'min-w-0',
                        'text-sm text-pfa-grey-900',
                        'placeholder:text-sm placeholder:text-pfa-beige-500 outline-none hover:cursor-pointer',
                        'grow'
                    )}
                    {...props}
                />
                {icon && icon}
            </div>
            {helperText && (
                <div className='flex justify-end'>
                    <Text>{helperText}</Text>
                </div>
            )}
            {error && (
                <Text
                    className={clsx(
                        'h-4 opacity-0 transition-opacity duration-300',
                        { 'opacity-100': error }
                    )}
                    color={'pfa-red'}
                >
                    {error}
                </Text>
            )}
        </div>
    )
})

export default Input
