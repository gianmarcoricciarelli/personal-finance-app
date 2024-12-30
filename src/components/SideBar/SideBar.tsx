import MinimizeMenuIcon from '@images/icon-minimize-menu.svg?react'
import NavBudgetsIcon from '@images/icon-nav-budgets.svg?react'
import NavOverviewIcon from '@images/icon-nav-overview.svg?react'
import NavPotsIcon from '@images/icon-nav-pots.svg?react'
import NavRecurringBillsIcon from '@images/icon-nav-recurring-bills.svg?react'
import NavTransactionIcon from '@images/icon-nav-transactions.svg?react'
import clsx from 'clsx'
import { ReactElement, useState } from 'react'
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
                'pb-6 rounded-r-xl',
                'bg-grey-900',
                'flex gap-6 md:flex-col',
                'transition-all duration-300',
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
            <Item
                isMenuCollapsed={isMenuCollapsed}
                showText={showText}
                rotateIconOnCollapse
                iconComponent={<MinimizeMenuIcon />}
                label='Minimize Menu'
                onClick={minimizeMenuHandler}
            />
        </div>
    )
}
