import DataContext from '@contexts/Data/Data.context'
import { useContext } from 'react'
import { Transaction } from '../types'

export default function useRecurringBillsData() {
    const { data } = useContext(DataContext)

    const transactions: Transaction[] = data.transactions

    const recurringBills = transactions.filter(
        (transaction) => transaction.recurring && transaction.amount < 0
    )
    const [paidBills, upcomingBills, dueSoonBills] = recurringBills.reduce(
        (prev, curr) => {
            if (new Date(curr.date) < new Date('2024-08-01T00:00:00Z')) {
                prev[0].push(curr)
            } else {
                const lastPaidBills = recurringBills
                    .filter((bill) => bill.name === curr.name)
                    .sort(
                        (a, b) =>
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime()
                    )

                if (
                    lastPaidBills[lastPaidBills.length - 2] &&
                    new Date(
                        lastPaidBills[lastPaidBills.length - 2].date
                    ).getDate() - new Date(curr.date).getDay()
                ) {
                    prev[2].push(curr)
                } else {
                    prev[1].push(curr)
                }
            }

            return prev
        },

        [[], [], []] as Transaction[][]
    )

    const paidBillsTotal = paidBills.reduce(
        (prev, curr) => prev + Math.abs(curr.amount),
        0
    )
    const upcomingBillsTotal = upcomingBills.reduce(
        (prev, curr) => prev + Math.abs(curr.amount),
        0
    )
    const dueSoonBillsTotal = dueSoonBills.reduce(
        (prev, curr) => prev + Math.abs(curr.amount),
        0
    )

    const summary = {
        'Paid Bills': { bills: paidBills, total: paidBillsTotal },
        'Total Upcoming': { bills: upcomingBills, total: upcomingBillsTotal },
        'Due Soon': { bills: dueSoonBills, total: dueSoonBillsTotal },
    }

    return {
        paidBills,
        upcomingBills,
        dueSoonBills,
        paidBillsTotal,
        upcomingBillsTotal,
        dueSoonBillsTotal,
        summary,
    }
}
