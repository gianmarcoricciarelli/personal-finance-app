import DropDown from '@components/DropDown/DropDown'
import Text from '@components/Text/Text'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef, Ref, useState } from 'react'

type MenuOption =
    | 'Latest'
    | 'Oldest'
    | 'A to Z'
    | 'Z to A'
    | 'Highest'
    | 'Lowest'

interface DropDownButtonProps extends ComponentPropsWithoutRef<'div'> {
    selectedOption: MenuOption
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

export default function SortBills() {
    const [selectedOption, setSelectedOption] = useState<MenuOption>('Latest')

    const menuOptions: MenuOption[] = [
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
                        color='pfa-grey-900'
                        onClick={() => setSelectedOption(option)}
                    >
                        {option}
                    </Text>
                ))}
            </DropDown>
        </div>
    )
}
