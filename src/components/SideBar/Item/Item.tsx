import Text from '@components/Text/Text'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import clsx from 'clsx'
import { cloneElement, ReactElement, useContext } from 'react'
import { NavLink, To } from 'react-router'

interface Item {
    isMenuCollapsed: boolean
    showText: boolean
    iconComponent: ReactElement
    label: string
    to?: To
    onClick?: () => void
}

export default function Item({
    isMenuCollapsed,
    showText,
    iconComponent,
    label,
    to,
    onClick
}: Item) {
    const { isMobile } = useContext(ViewportObserver)

    const Component = to !== undefined ? NavLink : 'div'
    const _iconComponent = cloneElement(iconComponent, {
        className: clsx(
            iconComponent.props.className,
            'w-6 min-w-6 h-6 min-h-6',
            'text-pfa-grey-300 group-hover:text-pfa-green',
            'transition-all duration-300'
        )
    })

    return (
        <Component
            className={clsx(
                'w-[68.6px] mobile:max-tablet:w-[104px] tablet:w-full tablet:h-14',
                'pt-2 pb-3 tablet:px-8 tablet:py-4',
                'rounded-t-md tablet:rounded-l-none tablet:rounded-r-xl',
                'flex mobile:max-tablet:flex-col justify-center tablet:justify-start items-center mobile:max-tablet:gap-2 tablet:gap-4',
                'group hover:bg-pfa-beige-100 hover:cursor-pointer transition-colors duration-300'
            )}
            to={to as To}
            onClick={onClick}
        >
            {_iconComponent}
            {!isMenuCollapsed && !isMobile && (
                <Text
                    fontStyle='bold'
                    color='pfa-grey-300'
                    className={clsx(
                        'mobile:max-tablet:text-xs tablet:text-base whitespace-nowrap',
                        'group-hover:text-pfa-grey-900',
                        'transition-all duration-300',
                        {
                            'opacity-100': showText,
                            'opacity-0': !showText
                        }
                    )}
                >
                    {label}
                </Text>
            )}
        </Component>
    )
}
