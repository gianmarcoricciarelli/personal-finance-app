import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import TextBox from '@components/TextBox/TextBox'
import data from '@data/data.json'
import clsx from 'clsx'
import { useNavigate } from 'react-router'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Budget, Color } from '../../../types'

export default function Budgets() {
    const navigate = useNavigate()

    const budgets: Budget[] = data.budgets

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
            <div className={clsx('py-2', 'flex flex-col gap-4')}>
                <ResponsiveContainer width='100%' height={240}>
                    <PieChart height={240} width={240}>
                        <Pie
                            data={budgets}
                            dataKey='maximum'
                            innerRadius={60}
                            blendStroke
                        >
                            {budgets.map((budget) => (
                                <Cell fill={budget.theme} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className='grid grid-cols-2 gap-4'>
                    {budgets.map((budget) => (
                        <TextBox.WithTag
                            key={budget.category}
                            color={budget.theme as Color}
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
