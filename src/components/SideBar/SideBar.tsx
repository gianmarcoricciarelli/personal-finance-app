import clsx from 'clsx'
import { NavLink } from 'react-router'
import NavBudgetsIcon from '../../../public/assets/images/icon-nav-budgets.svg?react'
import NavOverviewIcon from '../../../public/assets/images/icon-nav-overview.svg?react'
import NavPotsIcon from '../../../public/assets/images/icon-nav-pots.svg?react'
import NavRecurringBillsIcon from '../../../public/assets/images/icon-nav-recurring-bills.svg?react'
import NavTransactionIcon from '../../../public/assets/images/icon-nav-transactions.svg?react'
import React from 'react'

export default function SideBar() {
    const navBarItemsToIconName: Record<string, React.ReactElement> = {
        Overview: <NavOverviewIcon />,
        Transactions: <NavTransactionIcon />,
        Budgets: <NavBudgetsIcon />,
        Pots: <NavPotsIcon />,
        'Recurring bills': <NavRecurringBillsIcon />,
    } as const

    return (
        <div className={clsx('pb-6', 'bg-grey-900', 'flex gap-6 md:flex-col')}>
            <div className='px-8 py-10'>
                <img
                    src='public/assets/images/logo-large.svg'
                    alt='Finance Large Logo'
                />
            </div>
            <div className='pr-6 flex flex-col gap-1'>
                {Object.keys(navBarItemsToIconName).map((navItem) => {
                    const iconComponent = React.cloneElement(
                        navBarItemsToIconName[navItem],
                        {
                            className:
                                'text-grey-300 transition-colors duration-300 group-hover:text-pfa-green',
                        }
                    )

                    return (
                        <NavLink
                            key={navItem}
                            className={clsx(
                                'px-8 py-4 rounded-r-xl group',
                                'flex gap-4',
                                'hover:bg-beige-100 transition-colors duration-300'
                            )}
                            to={'/'}
                        >
                            {iconComponent}
                            <span className='text-grey-300 transition-colors duration-300 group-hover:text-grey-900'>
                                {navItem}
                            </span>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}
