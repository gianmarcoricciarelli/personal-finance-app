import Button from '@components/Button/Button'
import DropDown from '@components/DropDown/DropDown'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import Text from '@components/Text/Text'
import IconEllipsis from '@images/icon-ellipsis.svg?react'
import clsx from 'clsx'
import { Pot as PotType } from '../../../types'

interface PotProps {
    pot: PotType
}

export default function Pot({ pot }: PotProps) {
    return (
        <div
            className={clsx(
                'px-5 py-6 bg-pfa-white rounded-xl',
                'flex flex-col gap-8'
            )}
        >
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <div
                        style={{ backgroundColor: pot.theme }}
                        className='w-4 h-4 rounded-full'
                    />
                    <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                        {pot.name}
                    </Text>
                </div>

                <DropDown
                    ButtonComponent={
                        <div
                            className={clsx(
                                'w-5 h-5 transition-all duration-300 rounded-sm',
                                'flex justify-center items-center',
                                'hover:cursor-pointer hover:shadow-sm-solid-pfa-grey-300'
                            )}
                        >
                            <IconEllipsis
                                className={clsx('text-pfa-grey-300')}
                            />
                        </div>
                    }
                    onItemClick={() => console.log('It works!')}
                >
                    <Text fontSize='sm' color='pfa-grey-900'>
                        Edit Pot
                    </Text>
                    <Text fontSize='sm' color='pfa-red'>
                        Delete Pot
                    </Text>
                </DropDown>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <Text fontSize='sm'>Total Saved</Text>
                    <Text
                        fontSize='xxl'
                        fontStyle='bold'
                        color='pfa-grey-900'
                    >{`$${pot.total.toFixed(2)}`}</Text>
                </div>
                <div className='flex flex-col gap-3'>
                    <ProgressBar
                        percentage={(pot.total / pot.target) * 100}
                        height='xs'
                        color={pot.theme}
                    />
                    <div className='flex justify-between items-center'>
                        <Text fontStyle='bold'>
                            {((pot.total / pot.target) * 100).toFixed(2)}
                            <Text fontStyle='normal'>%</Text>
                        </Text>
                        <Text>{`Target of $${pot.target}`}</Text>
                    </div>
                </div>
            </div>
            <div className='flex gap-4'>
                <div className='flex-1'>
                    <Button.Secondary className='w-full'>
                        + Add Money
                    </Button.Secondary>
                </div>
                <div className='flex-1'>
                    <Button.Secondary className='w-full'>
                        Withdraw
                    </Button.Secondary>
                </div>
            </div>
        </div>
    )
}
