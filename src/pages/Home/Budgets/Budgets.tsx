import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import TextBox from '@components/TextBox/TextBox'
import DataContext from '@contexts/Data/Data.context'
import clsx from 'clsx'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Cell, Label, LabelProps, Pie, PieChart } from 'recharts'
import { PolarViewBox } from 'recharts/types/util/types'
import { Budget } from '../../../types'

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
    const navigate = useNavigate()

    const { data } = useContext(DataContext)
    const budgets = data.budgets
    const budgetLimit = budgets.reduce(
        (prev, curr: Budget) => prev + curr.maximum,
        0
    )

    return (
        <div
            className={clsx(
                'px-5 py-6 rounded-xl bg-pfa-white',
                'flex flex-col gap-5'
            )}
        >
            <div className='flex justify-between'>
                <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                    Budgets
                </Text>
                <Button.Tertiary onClick={() => navigate('budgets')}>
                    See Details
                </Button.Tertiary>
            </div>
            <div
                className={clsx(
                    'py-2',
                    'flex flex-col gap-4 sm:flex-row sm:items-center'
                )}
            >
                <div className={clsx('h-60', 'flex justify-center sm:grow')}>
                    <PieChart height={240} width={240}>
                        <Pie
                            data={budgets}
                            dataKey='maximum'
                            innerRadius={60}
                            blendStroke
                        >
                            {budgets.map((budget) => (
                                <Cell key={budget.theme} fill={budget.theme} />
                            ))}
                            <Label
                                width={30}
                                position='center'
                                content={
                                    <CustomLabel
                                        text='$338'
                                        subText={`of $${budgetLimit} limit`}
                                    />
                                }
                            />
                        </Pie>
                    </PieChart>
                </div>
                <div className='grid grid-cols-2 gap-4 sm:flex sm:flex-col'>
                    {budgets.map((budget) => (
                        <TextBox.WithTag
                            key={budget.category}
                            color={budget.theme}
                        >
                            <TextBox.WithSubText
                                title={
                                    <TextBox.Text>
                                        {budget.category}
                                    </TextBox.Text>
                                }
                                subTitle={
                                    <TextBox.Text
                                        fontSize='sm'
                                        fontStyle='bold'
                                        color='pfa-grey-900'
                                    >
                                        {'$' + budget.maximum.toFixed(2)}
                                    </TextBox.Text>
                                }
                            />
                        </TextBox.WithTag>
                    ))}
                </div>
            </div>
        </div>
    )
}
