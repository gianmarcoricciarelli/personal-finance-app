import DropDown from '@components/DropDown/DropDown'
import Text from '@components/Text/Text'
import clsx from 'clsx'
import {
    ComponentPropsWithoutRef,
    Dispatch,
    forwardRef,
    Ref,
    SetStateAction,
    useState,
} from 'react'
import { SortMenuOption } from '../../../../types'

interface DropDownButtonProps extends ComponentPropsWithoutRef<'div'> {
    selectedOption: SortMenuOption
}

const DropDownButton = forwardRef<Ref<HTMLElement>, DropDownButtonProps>(
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

export default function SortBills({
    onSortOptionChange,
}: {
    onSortOptionChange: Dispatch<SetStateAction<SortMenuOption>>
}) {
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
            <Text fontSize='sm'>Sort by</Text>
            <DropDown
                ButtonComponent={
                    <DropDownButton selectedOption={selectedOption} />
                }
            >
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
