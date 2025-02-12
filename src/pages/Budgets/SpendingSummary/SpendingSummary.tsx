import Text from '@components/Text/Text'
import TextBox from '@components/TextBox/TextBox'
import DataContext from '@contexts/Data/Data.context'
import { Fragment, useContext } from 'react'

export default function SpendingSummary({
    spentByCategory
}: {
    spentByCategory: { category: string; theme: string; spent: number }[]
}) {
    const {
        data: { budgets }
    } = useContext(DataContext)

    return (
        <div className='flex flex-col gap-6 mobile:max-tablet:grow'>
            <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                Spending Summary
            </Text>
            <div className='flex flex-col gap-4'>
                {spentByCategory
                    .sort(({ category: a }, { category: b }) =>
                        a.localeCompare(b)
                    )
                    .map(({ category, spent }, index, entries) => (
                        <Fragment key={index}>
                            <div className='flex justify-between items-center'>
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
                                            .find(
                                                (b) => b.category === category
                                            )
                                            ?.maximum.toFixed(2)}`}
                                    </Text>
                                </div>
                            </div>
                            {index !== entries.length - 1 && (
                                <div className='h-[1px] bg-pfa-grey-100' />
                            )}
                        </Fragment>
                    ))}
            </div>
        </div>
    )
}
