import clsx from 'clsx'

interface Container {
    className?: string
    fullHeight?: boolean
    flex?: 'row' | 'column'
    children: React.ReactNode
}

export default function Container({
    className,
    fullHeight,
    flex,
    children,
}: Container) {
    return (
        <div
            className={clsx(
                {
                    'h-full': fullHeight,
                    'flex flex-row': flex === 'row',
                    'flex flex-col': flex === 'column',
                },
                className || ''
            )}
        >
            {children}
        </div>
    )
}
