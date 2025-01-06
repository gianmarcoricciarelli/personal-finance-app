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
}

export default function DropDown({
    className,
    ButtonComponent,
    children,
}: DropDown) {
    const [isOpen, setIsOpen] = useState(false)
    const [fadeIn, setFadeIn] = useState(false)

    const dropDownButtonRef = useRef<HTMLElement | null>(null)
    const dropDownMenuRef = useRef<HTMLDivElement | null>(null)
    const childrenArray = Children.toArray(children)

    useOnClickOutside({
        triggerRef: dropDownMenuRef,
        handler: () => setIsOpen(false),
        elementsToIgnore: [dropDownButtonRef],
    })

    function onButtonClickHandler() {
        if (isOpen) {
            setFadeIn(false)
            setTimeout(() => setIsOpen(false), 400)
        } else {
            setIsOpen(true)
            setTimeout(() => setFadeIn(true), 100)
        }
    }

    function onItemClickHandler() {
        setFadeIn(false)
        setTimeout(() => setIsOpen(false), 400)
    }

    return (
        <div className='relative'>
            {cloneElement(ButtonComponent, {
                ...ButtonComponent.props,
                ref: dropDownButtonRef,
                onClick: onButtonClickHandler,
            })}
            {isOpen && (
                <div
                    ref={dropDownMenuRef}
                    className={clsx(
                        className || '',
                        'opacity-0',
                        'min-w-[114px] px-5 py-3 bg-pfa-white rounded-lg',
                        'flex flex-col gap-3',
                        'absolute left-0 bottom-0 -translate-x-1/2 translate-y-[calc(100%_+_4px)]',
                        'transition-opacity, duration-300',
                        {
                            'opacity-100': fadeIn,
                        }
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
                                            onItemClickHandler()
                                            child.props?.onClick()
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
