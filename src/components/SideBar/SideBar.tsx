import clsx from 'clsx'
import { ReactElement, useState } from 'react'
import MinimizeMenuIcon from '../../assets/images/icon-minimize-menu.svg?react'
import NavBudgetsIcon from '../../assets/images/icon-nav-budgets.svg?react'
import NavOverviewIcon from '../../assets/images/icon-nav-overview.svg?react'
import NavPotsIcon from '../../assets/images/icon-nav-pots.svg?react'
import NavRecurringBillsIcon from '../../assets/images/icon-nav-recurring-bills.svg?react'
import NavTransactionIcon from '../../assets/images/icon-nav-transactions.svg?react'
import Item from './Item/Item'

export default function SideBar() {
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
            }, 200)
        } else {
            setShowText(false)
            setTimeout(() => {
                setIsMenuCollapsed(true)
            }, 200)
        }
    }

    return (
        <div
            className={clsx(
                'pb-6 rounded-r-xl',
                'bg-grey-900',
                'flex gap-6 md:flex-col',
                'transition-all duration-100',
                {
                    'pr-1 w-[88px]': isMenuCollapsed,
                    'w-[300px] pr-6': !isMenuCollapsed,
                }
            )}
        >
            {/* <div className='px-8 py-10'>
                <img
                    src='public/assets/images/logo-large.svg'
                    alt='Finance Large Logo'
                />
            </div> */}
            <div className='flex flex-col gap-1 grow'>
                {Object.keys(sideBarItemsToIconName).map((sideBarItem) => {
                    return (
                        <Item
                            isMenuCollapsed={isMenuCollapsed}
                            showText={showText}
                            iconComponent={sideBarItemsToIconName[sideBarItem]}
                            label={sideBarItem}
                        />
                    )
                })}
            </div>
            <div
                className={clsx(
                    'h-14 px-8 py-4 rounded-r-xl group',
                    'flex gap-4 items-center',
                    'hover:bg-beige-100 hover:cursor-pointer',
                    'transition-colors duration-300'
                )}
                onClick={minimizeMenuHandler}
            >
                <MinimizeMenuIcon
                    className={clsx(
                        'w-4 h-4',
                        'text-grey-300 group-hover:text-pfa-green',
                        'transition-all duration-100',
                        { 'rotate-180': isMenuCollapsed }
                    )}
                />
                {!isMenuCollapsed && (
                    <span
                        className={clsx(
                            'text-grey-300 font-bold transition-all duration-100 group-hover:text-grey-900',
                            {
                                'opacity-100': showText,
                                'opacity-0': !showText,
                            }
                        )}
                    >
                        Minimize Menu
                    </span>
                )}
            </div>
        </div>
    )
}
