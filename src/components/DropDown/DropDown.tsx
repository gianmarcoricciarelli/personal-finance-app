import clsx from 'clsx'
import {
    Children,
    cloneElement,
    ComponentProps,
    isValidElement,
    ReactElement,
    useRef,
    useState,
} from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'

interface DropDown extends ComponentProps<'div'> {
    ButtonComponent: ReactElement
    onItemClick: () => void
}

export default function DropDown({
    className,
    ButtonComponent,
    onItemClick,
    children,
}: DropDown) {
    const [isOpen, setIsOpen] = useState(false)
    const dropDownButtonRef = useRef<HTMLElement | null>(null)
    const dropDownMenuRef = useRef<HTMLDivElement | null>(null)
    const childrenArray = Children.toArray(children)

    useOnClickOutside(dropDownMenuRef, () => setIsOpen(false), [
        dropDownButtonRef,
    ])

    return (
        <div className='relative'>
            {cloneElement(ButtonComponent, {
                ...ButtonComponent.props,
                ref: dropDownButtonRef,
                onClick: () => setIsOpen((prevValue) => !prevValue),
            })}
            {isOpen && (
                <div
                    ref={dropDownMenuRef}
                    className={clsx(
                        className || '',
                        'min-w-[114px] px-5 py-3 bg-pfa-white rounded-lg',
                        'flex flex-col gap-3',
                        'absolute left-0 bottom-0 -translate-x-1/2 translate-y-[calc(100%_+_4px)]'
                    )}
                >
                    {childrenArray.map((child, index) => {
                        if (isValidElement(child)) {
                            return (
                                <>
                                    {cloneElement(child, {
                                        ...child.props,
                                        className: `${
                                            child.props.className || ''
                                        } hover:cursor-pointer`,
                                        onClick: () => {
                                            onItemClick()
                                            setIsOpen(false)
                                        },
                                    })}
                                    {index !== childrenArray.length - 1 && (
                                        <div className='h-[1px] bg-pfa-grey-100' />
                                    )}
                                </>
                            )
                        }
                    })}
                </div>
            )}
        </div>
    )
}
