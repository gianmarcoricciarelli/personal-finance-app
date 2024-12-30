import {
    IViewportObserver,
    ViewportObserver,
} from '@contexts/ViewportObserver/ViewportObserver.context'
import MinimizeMenuIcon from '@images/icon-minimize-menu.svg?react'
import NavBudgetsIcon from '@images/icon-nav-budgets.svg?react'
import NavOverviewIcon from '@images/icon-nav-overview.svg?react'
import NavPotsIcon from '@images/icon-nav-pots.svg?react'
import NavRecurringBillsIcon from '@images/icon-nav-recurring-bills.svg?react'
import NavTransactionIcon from '@images/icon-nav-transactions.svg?react'
import LargeLogo from '@images/logo-large.svg?react'
import SmallLogo from '@images/logo-small.svg?react'
import clsx from 'clsx'
import { Context, ReactElement, useContext, useState } from 'react'
import Item from './Item/Item'

export default function SideBar() {
    const { isMobile } = useContext(
        ViewportObserver as Context<IViewportObserver>
    )

    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
    const [showText, setShowText] = useState(true)

    const sideBarItemsToIconName: Record<string, ReactElement> = {
        Overview: <NavOverviewIcon />,
        Transactions: <NavTransactionIcon />,
        Budgets: <NavBudgetsIcon />,
        Pots: <NavPotsIcon />,
        'Recurring bills': <NavRecurringBillsIcon />,
    } as const

    function minimizeMenuHandler() {
        if (isMenuCollapsed) {
            setIsMenuCollapsed(false)
            setTimeout(() => {
                setShowText(true)
            }, 400)
        } else {
            setShowText(false)
            setTimeout(() => {
                setIsMenuCollapsed(true)
            }, 400)
        }
    }

    return (
        <div
            className={clsx(
                'w-full px-10 pt-2 rounded-r-xl md:pl-0 md:pb-6 md:pt-0',
                'bg-grey-900',
                'flex gap-6 md:flex-col',
                'transition-all duration-300',
                {
                    'md:pr-1 md:w-[88px]': isMenuCollapsed,
                    'md:w-[300px] md:pr-6': !isMenuCollapsed,
                }
            )}
        >
            {!isMobile && (
                <div className='px-8 py-10'>
                    {isMenuCollapsed || (isMobile && <SmallLogo />)}
                    {!isMenuCollapsed && !isMobile && <LargeLogo />}
                </div>
            )}

            <div className='flex justify-evenly gap-1 grow md:flex-col md:justify-normal'>
                {Object.keys(sideBarItemsToIconName).map((sideBarItem) => {
                    return (
                        <Item
                            key={sideBarItem}
                            isMenuCollapsed={isMenuCollapsed}
                            showText={showText}
                            iconComponent={sideBarItemsToIconName[sideBarItem]}
                            label={sideBarItem}
                            to=''
                        />
                    )
                })}
            </div>
            {!isMobile && (
                <Item
                    isMenuCollapsed={isMenuCollapsed}
                    showText={showText}
                    rotateIconOnCollapse
                    iconComponent={<MinimizeMenuIcon />}
                    label='Minimize Menu'
                    onClick={minimizeMenuHandler}
                />
            )}
        </div>
    )
}
