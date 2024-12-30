import {
    IViewportObserver,
    ViewportObserver,
} from '@contexts/ViewportObserver/ViewportObserver.context'
import clsx from 'clsx'
import { cloneElement, Context, ReactElement, useContext } from 'react'
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
    const { isMobile } = useContext(
        ViewportObserver as Context<IViewportObserver>
    )

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
                'pt-2 pb-3 rounded-r-xl group md:h-14 md:px-8 md:py-4',
                'flex flex-col gap-1 items-center md:flex-row md:gap-4',
                'hover:bg-beige-100 hover:cursor-pointer transition-colors duration-300',
                { 'rotate-180': rotateIconOnCollapse && isMenuCollapsed }
            )}
            to={to as string}
            onClick={onClick}
        >
            {_iconComponent}
            {!isMenuCollapsed && (
                <span
                    className={clsx(
                        'text-xs text-grey-300 font-bold group-hover:text-grey-900 md:text-base',
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
