import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import DataContext from '@contexts/Data/Data.context'
import clsx from 'clsx'
import { useContext } from 'react'
import Budget from './Budget/Budget'
import SpendingSummary from './SpendingSummary/SpendingSummary'

export default function Budgets() {
    const {
        data: { budgets, transactions }
    } = useContext(DataContext)
    const categories = new Set(budgets.map((b) => b.category))
    const transactionsByCategory = transactions.filter(
        (t) => categories.has(t.category) && new Date(t.date).getMonth() === 7
    )
    const spentByCategory = transactionsByCategory.reduce((prev, curr) => {
        prev[curr.category] = prev[curr.category]
            ? prev[curr.category] + Math.abs(curr.amount)
            : Math.abs(curr.amount)

        return prev
    }, {} as Record<string, number>)

    return (
        <div
            className={clsx(
                'px-4 tablet:max-desktop:px-10 py-6 tablet:max-desktop:py-8',
                'bg-pfa-beige-100',
                'flex flex-col gap-8 grow'
            )}
        >
            <div className='py-2 flex justify-between items-center'>
                <Text fontSize='xxl' fontStyle='bold' color='pfa-grey-900'>
                    Budgets
                </Text>
                <Button.Primary onClick={() => console.log('click')}>
                    + Add New Budget
                </Button.Primary>
            </div>
            <div className='flex flex-col desktop:flex-row gap-6'>
                <div
                    className={clsx(
                        'px-5 py-6 tablet:max-desktop:px-8 tablet:max-desktop:py-8 desktop:px-8 desktop:py-8',
                        'bg-pfa-white rounded-xl',
                        'flex flex-col tablet:max-desktop:flex-row gap-8'
                    )}
                >
                    <span>Chart</span>
                    <SpendingSummary spentByCategory={spentByCategory} />
                </div>
                <div className='flex flex-col gap-6'>
                    {budgets.map((budget, index) => {
                        return (
                            <Budget
                                key={index}
                                {...budget}
                                transactions={transactionsByCategory.filter(
                                    (t) => t.category === budget.category
                                )}
                                spent={spentByCategory[budget.category]}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
