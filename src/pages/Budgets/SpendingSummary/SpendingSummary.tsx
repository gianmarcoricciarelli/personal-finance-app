import Text from '@components/Text/Text'
import TextBox from '@components/TextBox/TextBox'
import DataContext from '@contexts/Data/Data.context'
import { useContext } from 'react'

export default function SpendingSummary({
    spentByCategory
}: {
    spentByCategory: Record<string, number>
}) {
    const {
        data: { budgets }
    } = useContext(DataContext)

    return (
        <div className='flex flex-col gap-6'>
            <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                Spending Summary
            </Text>
            <div className='flex flex-col gap-4'>
                {Object.entries(spentByCategory)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([category, spent]) => (
                        <div
                            key={category}
                            className='flex justify-between items-center'
                        >
                            <TextBox.WithTag
                                color={
                                    budgets.find(
                                        (b) => b.category === category
                                    )!.theme
                                }
                            >
                                <Text fontSize='sm'>{category}</Text>
                            </TextBox.WithTag>
                            <div className='flex items-center gap-2'>
                                <Text
                                    fontSize='base'
                                    fontStyle='bold'
                                    color='pfa-grey-900'
                                >
                                    {`$${spent.toFixed(2)}`}
                                </Text>
                                <Text fontSize='sm'>
                                    {`of $${budgets
                                        .find((b) => b.category === category)
                                        ?.maximum.toFixed(2)}`}
                                </Text>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
