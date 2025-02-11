import clsx from 'clsx'
import { ComponentProps, ReactNode, useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'

function Backdrop({ children }: { children: ReactNode }) {
    return (
        <div
            className={clsx(
                'bg-black/50',
                'flex justify-center items-center',
                'fixed top-0 bottom-0 left-0 right-0 z-10'
            )}
        >
            {children}
        </div>
    )
}

function Container({
    className,
    isOpen,
    children,
    onClose
}: { isOpen: boolean; onClose: () => void } & ComponentProps<'div'>) {
    const containerRef = useRef<HTMLDivElement>(null)

    useOnClickOutside({ triggerRef: containerRef, handler: onClose })

    if (!isOpen) {
        return null
    }

    return (
        <Backdrop>
            <div
                ref={containerRef}
                className={clsx(
                    className,
                    'w-[335px] tablet:max-desktop:w-[560px] desktop:w-[560px] px-5 py-6 bg-pfa-white rounded-xl',
                    'flex flex-col gap-5'
                )}
            >
                {children}
            </div>
        </Backdrop>
    )
}

function Header({ className, children }: ComponentProps<'div'>) {
    return <div className={className}>{children}</div>
}

function Body({ className, children }: ComponentProps<'div'>) {
    return <div className={className}>{children}</div>
}

function Footer({ className, children }: ComponentProps<'div'>) {
    return <div className={className}>{children}</div>
}

const Modal = {
    Container,
    Header,
    Body,
    Footer
}

export default Modal
