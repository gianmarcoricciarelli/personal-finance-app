import DataContext from '@/contexts/Data/Data.context'
import useBudgets from '@/hooks/useBudgets'
import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import clsx from 'clsx'
import { useContext } from 'react'
import { Cell, Label, LabelProps, Pie, PieChart } from 'recharts'
import { PolarViewBox } from 'recharts/types/util/types'
import Budget from './Budget/Budget'
import SpendingSummary from './SpendingSummary/SpendingSummary'

function CustomLabel({
    viewBox,
    text,
    subText
}: LabelProps & {
    text: string
    subText: string
}) {
    const { cx, cy } = (viewBox as PolarViewBox)!

    return (
        <text
            className='recharts-text recharts-label'
            x={cx}
            y={cy}
            textAnchor='middle'
            dominantBaseline='central'
        >
            <tspan
                className='text-pfa-grey-900'
                alignmentBaseline='middle'
                fontSize={32}
                fontWeight={700}
            >
                {text}
            </tspan>
            <tspan className='text-pfa-grey-500' fontSize={12} x={cx} dy='24px'>
                {subText}
            </tspan>
        </text>
    )
}

export default function Budgets() {
    const {
        data: { budgets }
    } = useContext(DataContext)
    const { transactionsByCategory, spentByCategory, totalSpent, budgetLimit } =
        useBudgets()

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
                    <div className='flex justify-center items-center'>
                        <PieChart height={240} width={240}>
                            <Pie
                                data={spentByCategory}
                                dataKey='spent'
                                innerRadius={60}
                                blendStroke
                            >
                                {spentByCategory.map((sBC) => (
                                    <Cell key={sBC.category} fill={sBC.theme} />
                                ))}
                                <Label
                                    width={30}
                                    position='center'
                                    content={
                                        <CustomLabel
                                            text={`$${totalSpent}`}
                                            subText={`of $${budgetLimit} limit`}
                                        />
                                    }
                                />
                            </Pie>
                        </PieChart>
                    </div>
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
                                spent={
                                    spentByCategory.find(
                                        (b) => b.category === budget.category
                                    )!.spent
                                }
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
