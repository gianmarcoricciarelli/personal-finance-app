import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import MinimizeMenuIcon from '@icons/icon-minimize-menu.svg?react'
import NavBudgetsIcon from '@icons/icon-nav-budgets.svg?react'
import NavOverviewIcon from '@icons/icon-nav-overview.svg?react'
import NavPotsIcon from '@icons/icon-nav-pots.svg?react'
import NavRecurringBillsIcon from '@icons/icon-nav-recurring-bills.svg?react'
import NavTransactionIcon from '@icons/icon-nav-transactions.svg?react'
import LargeLogo from '@icons/logo-large.svg?react'
import SmallLogo from '@icons/logo-small.svg?react'
import clsx from 'clsx'
import { ReactElement, useContext, useState } from 'react'
import { To } from 'react-router'
import Item from './Item/Item'

export default function SideBar() {
    const { isMobile, isTablet } = useContext(ViewportObserver)

    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
    const [showText, setShowText] = useState(true)

    const sideBarItemsToIconName: Record<string, ReactElement> = {
        Overview: <NavOverviewIcon />,
        Transactions: <NavTransactionIcon />,
        Budgets: <NavBudgetsIcon />,
        Pots: <NavPotsIcon />,
        'Recurring bills': <NavRecurringBillsIcon />
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
                'px-4 pt-2 mobile:max-tablet:px-10 tablet:px-0 tablet:pt-0 tablet:pb-6',
                'rounded-t-lg tablet:rounded-tl-none tablet:rounded-r-lg',
                'bg-pfa-grey-900',
                'flex tablet:flex-col tablet:gap-6',
                'transition-all duration-300',
                {
                    'w-w-full mobile:max-tablet:w-full': isMobile || isTablet,
                    'w-[88px]': isMenuCollapsed && !(isMobile || isTablet),
                    'w-[300px]': !isMenuCollapsed && !(isMobile || isTablet)
                }
            )}
        >
            {!(isTablet || isMobile) && (
                <div className='px-8 py-10'>
                    {isMenuCollapsed && <SmallLogo />}
                    {!isMenuCollapsed && <LargeLogo />}
                </div>
            )}
            <div
                className={clsx(
                    'mobile:max-tablet:w-full tablet:w-[unset]',
                    'tablet:pr-6',
                    'flex tablet:flex-col items-center tablet:items-start mobile:max-tablet:justify-between tablet:justify-start tablet:gap-1 tablet:grow',
                    { 'pr-2!': isMenuCollapsed }
                )}
            >
                {Object.keys(sideBarItemsToIconName).map((sideBarItem) => {
                    let _to: To = ''
                    if (
                        sideBarItem !== 'Overview' &&
                        sideBarItem !== 'Recurring bills'
                    ) {
                        _to = sideBarItem.toLowerCase()
                    } else if (sideBarItem === 'Overview') {
                        _to = '/'
                    } else {
                        _to = 'recurring-bills'
                    }

                    return (
                        <Item
                            key={sideBarItem}
                            isMenuCollapsed={isMenuCollapsed}
                            showText={showText}
                            iconComponent={sideBarItemsToIconName[sideBarItem]}
                            label={sideBarItem}
                            to={_to}
                        />
                    )
                })}
            </div>
            {!(isTablet || isMobile) && (
                <div
                    className={clsx('pr-6 flex flex-col', {
                        'pr-2!': isMenuCollapsed
                    })}
                >
                    <Item
                        isMenuCollapsed={isMenuCollapsed}
                        showText={showText}
                        iconComponent={
                            <MinimizeMenuIcon
                                className={clsx({
                                    'rotate-180': isMenuCollapsed
                                })}
                            />
                        }
                        label='Minimize Menu'
                        onClick={minimizeMenuHandler}
                    />
                </div>
            )}
        </div>
    )
}
