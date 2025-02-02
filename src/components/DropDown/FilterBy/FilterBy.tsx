import Text from '@components/Text/Text'
import DataContext from '@contexts/Data/Data.context'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import FilterIcon from '@images/icon-filter-mobile.svg?react'
import clsx from 'clsx'
import {
    ComponentPropsWithoutRef,
    Dispatch,
    forwardRef,
    Ref,
    SetStateAction,
    useContext,
    useState,
} from 'react'
import DropDown from '../DropDown'

interface FilterButtonProps extends ComponentPropsWithoutRef<'div'> {
    selectedFilter: string
}

const FilterButton = forwardRef<Ref<HTMLElement>, FilterButtonProps>(
    function DropDownButton({ selectedFilter, onClick }, ref) {
        return (
            <div
                ref={ref as Ref<HTMLDivElement>}
                className={clsx(
                    'px-5 py-3',
                    'flex items-center gap-4',
                    'rounded-lg',
                    'border-[1px] border-pfa-beige-500',
                    'hover:cursor-pointer'
                )}
                onClick={onClick}
            >
                <Text
                    className='whitespace-nowrap'
                    fontSize='sm'
                    color='pfa-grey-900'
                >
                    {selectedFilter}
                </Text>
            </div>
        )
    }
)

export default function FilterBy({
    onFilterOptionChange,
}: {
    onFilterOptionChange: Dispatch<SetStateAction<string>>
}) {
    const { isMobile } = useContext(ViewportObserver)
    const {
        data: { transactions },
    } = useContext(DataContext)

    const [selectedFilter, setSelectedFilter] = useState('All transactions')

    const transactionCategories = [
        ...['All transactions'],
        ...new Set(transactions.map((t) => t.category)),
    ].sort((a, b) => a.localeCompare(b))

    return (
        <div className='flex items-center gap-2'>
            {!isMobile && <Text fontSize='sm'>Category</Text>}
            <DropDown
                className={clsx('w-[177px]', {
                    'left-[unset] right-0 translate-x-0': isMobile,
                })}
                ButtonComponent={
                    isMobile ? (
                        <FilterIcon />
                    ) : (
                        <FilterButton selectedFilter={selectedFilter} />
                    )
                }
            >
                {isMobile && <Text fontSize='sm'>Category</Text>}
                {transactionCategories.map((t) => (
                    <Text
                        key={t}
                        className='whitespace-nowrap'
                        fontSize='sm'
                        fontStyle={selectedFilter === t ? 'bold' : 'normal'}
                        color='pfa-grey-900'
                        onClick={() => {
                            setSelectedFilter(t)
                            onFilterOptionChange(t)
                        }}
                    >
                        {t}
                    </Text>
                ))}
            </DropDown>
        </div>
    )
}
