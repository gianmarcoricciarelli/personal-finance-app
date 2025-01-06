import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'

function Backdrop({
    onClick,
    children,
}: {
    onClick: () => void
    children: ReactNode
}) {
    return (
        <div
            className={clsx(
                'bg-black/50',
                'flex justify-center items-center',
                'fixed top-0 bottom-0 left-0 right-0 z-10'
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

function Container({
    className,
    isOpen,
    children,
    onClose,
}: { isOpen: boolean; onClose: () => void } & ComponentProps<'div'>) {
    if (!isOpen) {
        return null
    }

    return (
        <Backdrop onClick={() => onClose()}>
            <div
                className={clsx(
                    className,
                    'px-5 py-6 bg-pfa-white rounded-xl',
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
    Footer,
}

export default Modal
