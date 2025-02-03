import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import DataContext from '@contexts/Data/Data.context'
import clsx from 'clsx'
import { useContext } from 'react'
import Budget from './Budget/Budget'

export default function Budgets() {
    const { data } = useContext(DataContext)
    const { budgets } = data

    return (
        <div
            className={clsx(
                'px-4 tablet:px-10 py-6 tablet:py-8',
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
            <div className='flex flex-col tablet:flex-row desktop:flex-row gap-6'>
                <div>Placeholder</div>
                <div className='flex flex-col gap-6'>
                    {budgets.map((budget, index) => {
                        return <Budget key={index} {...budget} />
                    })}
                </div>
            </div>
        </div>
    )
}
