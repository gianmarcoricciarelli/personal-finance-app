import Text from '@components/Text/Text'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import SortIcon from '@images/icon-sort-mobile.svg?react'
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
import { SortMenuOption } from '../../../types'
import DropDown from '../DropDown'

interface SortButtonProps extends ComponentPropsWithoutRef<'div'> {
    selectedOption: SortMenuOption
}

const SortButton = forwardRef<Ref<HTMLElement>, SortButtonProps>(
    function DropDownButton({ selectedOption, onClick }, ref) {
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
                <Text fontSize='sm' color='pfa-grey-900'>
                    {selectedOption}
                </Text>
            </div>
        )
    }
)

export default function SortBy({
    onSortOptionChange,
}: {
    onSortOptionChange: Dispatch<SetStateAction<SortMenuOption>>
}) {
    const { isMobile } = useContext(ViewportObserver)
    const [selectedOption, setSelectedOption] =
        useState<SortMenuOption>('Latest')

    const menuOptions: SortMenuOption[] = [
        'Latest',
        'Oldest',
        'A to Z',
        'Z to A',
        'Highest',
        'Lowest',
    ]

    return (
        <div className='flex items-center gap-2'>
            {!isMobile && <Text fontSize='sm'>Sort by</Text>}
            <DropDown
                className={clsx({
                    'left-[unset] right-0 translate-x-0': isMobile,
                })}
                ButtonComponent={
                    isMobile ? (
                        <SortIcon />
                    ) : (
                        <SortButton selectedOption={selectedOption} />
                    )
                }
            >
                {isMobile && <Text fontSize='sm'>Sort by</Text>}
                {menuOptions.map((option) => (
                    <Text
                        key={option}
                        fontSize='sm'
                        fontStyle={
                            selectedOption === option ? 'bold' : 'normal'
                        }
                        color='pfa-grey-900'
                        onClick={() => {
                            setSelectedOption(option)
                            onSortOptionChange(option)
                        }}
                    >
                        {option}
                    </Text>
                ))}
            </DropDown>
        </div>
    )
}
