import clsx from 'clsx'
import { cloneElement, ReactElement } from 'react'
import { NavLink } from 'react-router'

interface Item {
    isMenuCollapsed: boolean
    showText: boolean
    iconComponent: ReactElement
    label: string
}

export default function Item({
    isMenuCollapsed,
    showText,
    iconComponent,
    label,
}: Item) {
    const _iconComponent = cloneElement(iconComponent, {
        className: clsx(
            'w-4 h-4',
            'text-grey-300 group-hover:text-pfa-green',
            'transition-colors duration-300'
        ),
    })

    return (
        <NavLink
            className={clsx(
                'h-14 px-8 py-4 rounded-r-xl group',
                'flex gap-4 items-center',
                'hover:bg-beige-100 transition-colors duration-300'
            )}
            to={'/'}
        >
            {_iconComponent}
            {!isMenuCollapsed && (
                <span
                    className={clsx(
                        'text-grey-300 font-bold group-hover:text-grey-900',
                        'transition-all duration-100 ',
                        {
                            'opacity-100': showText,
                            'opacity-0': !showText,
                        }
                    )}
                >
                    {label}
                </span>
            )}
        </NavLink>
    )
}
