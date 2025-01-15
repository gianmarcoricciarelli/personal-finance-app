import Button from '@components/Button/Button'
import DropDown from '@components/DropDown/DropDown'
import Input from '@components/Input/Input'
import Text from '@components/Text/Text'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import SearchIcon from '@images/icon-search.svg?react'
import SortIcon from '@images/icon-sort-mobile.svg?react'
import clsx from 'clsx'
import { useContext } from 'react'

export default function Bills() {
    const { isMobile } = useContext(ViewportObserver)

    return (
        <div
            className={clsx(
                'px-5 py-6 tablet:p-8 desktop:p-8',
                'bg-pfa-white rounded-xl',
                'flex flex-col gap-6 desktop:grow-[0.75]'
            )}
        >
            <div className='flex items-center gap-6 sm:gap-0'>
                <div className='grow'>
                    <Input placeholder='Search bills' icon={<SearchIcon />} />
                </div>
                <div>
                    {isMobile && <SortIcon />}
                    {!isMobile && (
                        <div className='flex gap-2'>
                            <Text fontSize='sm'>Sort by</Text>
                            <DropDown
                                ButtonComponent={
                                    <Button.Tertiary>Button</Button.Tertiary>
                                }
                            >
                                <span>Hello</span>
                            </DropDown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
