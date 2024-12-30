import clsx from 'clsx'
import { cloneElement, ReactElement } from 'react'
import { NavLink } from 'react-router'

interface Item {
    isMenuCollapsed: boolean
    showText: boolean
    rotateIconOnCollapse?: boolean
    iconComponent: ReactElement
    label: string
    to?: string
    onClick?: () => void
}

export default function Item({
    isMenuCollapsed,
    showText,
    rotateIconOnCollapse,
    iconComponent,
    label,
    to,
    onClick,
}: Item) {
    const Component = to !== undefined ? NavLink : 'div'
    const _iconComponent = cloneElement(iconComponent, {
        className: clsx(
            'w-4 h-4',
            'text-grey-300 group-hover:text-pfa-green',
            'transition-colors duration-300'
        ),
    })

    return (
        <Component
            className={clsx(
                'h-14 px-8 py-4 rounded-r-xl group',
                'flex gap-4 items-center',
                'hover:bg-beige-100 transition-colors duration-300',
                { 'rotate-180': rotateIconOnCollapse && isMenuCollapsed }
            )}
            to={to as string}
            onClick={onClick}
        >
            {_iconComponent}
            {!isMenuCollapsed && (
                <span
                    className={clsx(
                        'text-grey-300 font-bold group-hover:text-grey-900',
                        'transition-all duration-300 ',
                        {
                            'opacity-100': showText,
                            'opacity-0': !showText,
                        }
                    )}
                >
                    {label}
                </span>
            )}
        </Component>
    )
}
