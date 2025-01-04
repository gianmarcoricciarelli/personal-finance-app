import Button from '@components/Button/Button'
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
                    <Text fontSize='xl' color='pfa-grey-900'>
                        {pot.name}
                    </Text>
                </div>
                <IconEllipsis className='w-4 h-4 text-pfa-grey-300' />
            </div>
            <span>Text</span>
            <div className='flex gap-4'>
                <div className='flex grow'>
                    <Button.Secondary>+ Add Money</Button.Secondary>
                </div>
                <div className='flex grow'>
                    <Button.Secondary>Withdraw</Button.Secondary>
                </div>
            </div>
        </div>
    )
}
