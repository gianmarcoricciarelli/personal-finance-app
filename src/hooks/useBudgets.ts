import DataContext from '@/contexts/Data/Data.context'
import { useContext } from 'react'

export default function useBudgets() {
    const {
        data: { budgets, transactions }
    } = useContext(DataContext)

    const budgetCategories = new Set(budgets.map((b) => b.category))
    const transactionsByCategory = transactions.filter(
        (t) =>
            budgetCategories.has(t.category) &&
            new Date(t.date).getMonth() === 7
    )
    const spentByCategory = transactionsByCategory.reduce((prev, curr) => {
        const spentByCategoryItem = prev.find(
            (item) => item.category === curr.category
        )

        if (spentByCategoryItem) {
            spentByCategoryItem.spent += Math.abs(curr.amount)
        } else {
            prev.push({
                category: curr.category,
                theme: budgets.find((b) => b.category === curr.category)!.theme,
                spent: Math.abs(curr.amount)
            })
        }

        return prev
    }, [] as { category: string; theme: string; spent: number }[])
    const totalSpent = spentByCategory.reduce(
        (prev, curr) => prev + curr.spent,
        0
    )
    const budgetLimit = budgets.reduce((prev, curr) => prev + curr.maximum, 0)

    return {
        transactionsByCategory,
        spentByCategory,
        totalSpent,
        budgetLimit
    }
}
