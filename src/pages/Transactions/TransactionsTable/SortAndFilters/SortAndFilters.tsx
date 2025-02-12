import FilterBy from '@components/DropDown/FilterBy/FilterBy'
import SortBy from '@components/DropDown/SortBy/SortBy'
import Input from '@components/Input/Input'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import SearchIcon from '@icons/icon-search.svg?react'
import { Dispatch, SetStateAction, useContext } from 'react'
import { SortMenuOption } from '../../../../types'

export default function SortAndFilters({
    onSortChange,
    onFilterChange
}: {
    onSortChange: Dispatch<SetStateAction<SortMenuOption>>
    onFilterChange: Dispatch<SetStateAction<string>>
}) {
    const { isMobile } = useContext(ViewportObserver)

    return isMobile ? (
        <div className='flex items-center gap-6'>
            <Input icon={<SearchIcon />} placeholder='Search transaction' />
            <div className='flex items-center gap-6'>
                <SortBy onSortOptionChange={onSortChange} />
                <FilterBy onFilterOptionChange={onFilterChange} />
            </div>
        </div>
    ) : (
        <div className='flex items-center mobile:max-tablet:gap-6'>
            <Input icon={<SearchIcon />} placeholder='Search transaction' />
            <div className='flex tablet:justify-end items-center gap-6 tablet:grow'>
                <SortBy onSortOptionChange={onSortChange} />
                <FilterBy onFilterOptionChange={onFilterChange} />
            </div>
        </div>
    )
}
