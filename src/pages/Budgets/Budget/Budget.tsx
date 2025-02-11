import ProgressBar from '@components/ProgressBar/ProgressBar'
import Text from '@components/Text/Text'
import TextBox from '@components/TextBox/TextBox'
import CaretRightIcon from '@icons/icon-caret-right.svg?react'
import EllipsisIcon from '@icons/icon-ellipsis.svg?react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Budget as BudgetType, Transaction } from '../../../types'

interface BudgetProps {
    category: BudgetType['category']
    maximum: BudgetType['maximum']
    theme: BudgetType['theme']
    transactions: Transaction[]
    spent: number
}

export default function Budget({
    category,
    maximum,
    theme,
    transactions,
    spent
}: BudgetProps) {
    return (
        <div
            className={clsx(
                'px-5 tablet:max-desktop:px-8 py-6 tablet:max-desktop:py-8',
                'bg-pfa-white rounded-xl',
                'flex flex-col gap-5'
            )}
        >
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <div
                        style={{ backgroundColor: theme }}
                        className='w-4 h-4 rounded-full'
                    />
                    <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                        {category}
                    </Text>
                </div>
                <EllipsisIcon
                    className='w-4 h-4 text-pfa-grey-300 hover:cursor-pointer'
                    onClick={() => console.log('click')}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <Text fontSize='sm'>{`Maximum of $${maximum}`}</Text>
                <ProgressBar
                    height='xxl'
                    percentages={
                        (spent / maximum) * 100 > 100
                            ? 100
                            : (spent / maximum) * 100
                    }
                    colors={theme}
                />
                <div className='flex'>
                    <TextBox.WithTag className='grow' color={theme}>
                        <div className='flex flex-col gap-2'>
                            <Text>Spent</Text>
                            <Text
                                fontSize='sm'
                                fontStyle='bold'
                                color='pfa-grey-900'
                            >
                                {`$${spent}`}
                            </Text>
                        </div>
                    </TextBox.WithTag>
                    <TextBox.WithTag className='grow' color={'#F8F4F0'}>
                        <div className='flex flex-col gap-2'>
                            <Text>Free</Text>
                            <Text
                                fontSize='sm'
                                fontStyle='bold'
                                color='pfa-grey-900'
                            >
                                {`$${maximum - spent}`}
                            </Text>
                        </div>
                    </TextBox.WithTag>
                </div>
            </div>
            <div className='p-4 flex flex-col gap-5 bg-pfa-beige-100 rounded-xl'>
                <div className='flex justify-between items-center'>
                    <Text fontSize='base' fontStyle='bold' color='pfa-grey-900'>
                        Latest Spending
                    </Text>
                    <div
                        className='flex items-center gap-3 hover:cursor-pointer'
                        onClick={() => console.log('click')}
                    >
                        <Text fontSize='sm'>See All</Text>
                        <CaretRightIcon className='w-3 h-3 text-pfa-grey-500' />
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    {transactions.slice(0, 3).map((t, index) => (
                        <Fragment key={index}>
                            <div className='flex justify-between items-center'>
                                <Text fontStyle='bold' color='pfa-grey-900'>
                                    {t.name}
                                </Text>
                                <div className='flex flex-col gap-1 text-right'>
                                    <Text
                                        fontStyle='bold'
                                        color='pfa-grey-900'
                                    >{`-$${Math.abs(t.amount)}`}</Text>
                                    <Text>{`${new Date(t.date).getDate()} ${
                                        new Date(t.date)
                                            .toDateString()
                                            .split(' ')[1]
                                    } ${new Date(t.date).getFullYear()}`}</Text>
                                </div>
                            </div>
                            {index !== transactions.length - 1 && (
                                <div className='h-[1px] bg-pfa-grey-500/15' />
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
