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

    const dropDownButtonRef = useRef<HTMLElement>(null)
    const dropDownMenuRef = useRef<HTMLDivElement>(null)
    const childrenArray = Children.toArray(children)

    useOnClickOutside({
        triggerRef: dropDownMenuRef,
        handler: () => {
            setFadeIn(false)
            setTimeout(() => setIsOpen(false), 400)
        },
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
                        'min-w-[114px] max-h-[120px] sm:max-h-[180px] overflow-y-auto px-5 py-3 bg-pfa-white rounded-lg',
                        'flex flex-col gap-3',
                        'absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[calc(100%_+_4px)]',
                        'transition-opacity, duration-300 shadow-lg',
                        {
                            'opacity-100': fadeIn,
                        }
                    )}
                >
                    {childrenArray.map((child, index) => {
                        if (isValidElement(child)) {
                            return (
                                <div
                                    key={index}
                                    className='w-full flex flex-col gap-3'
                                >
                                    {cloneElement(child, {
                                        ...child.props,
                                        className: `${
                                            child.props.className || ''
                                        } hover:cursor-pointer`,
                                        onClick: () => {
                                            onItemClickHandler()

                                            if (child.props?.onClick) {
                                                child.props.onClick()
                                            }
                                        },
                                    })}
                                    {index !== childrenArray.length - 1 && (
                                        <div className='h-[1px] bg-pfa-grey-100' />
                                    )}
                                </div>
                            )
                        }
                    })}
                </div>
            )}
        </div>
    )
}
