import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'

function Backdrop({ children }: { children: ReactNode }) {
    return (
        <div
            className={clsx(
                'bg-black/50',
                'flex justify-center items-center',
                'fixed top-0 bottom-0 left-0 right-0'
            )}
        >
            {children}
        </div>
    )
}

function Container({ className, children }: ComponentProps<'div'>) {
    return (
        <Backdrop>
            <div
                className={clsx(
                    className,
                    'px-5 py-6 bg-pfa-white rounded-xl opacity-100',
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
