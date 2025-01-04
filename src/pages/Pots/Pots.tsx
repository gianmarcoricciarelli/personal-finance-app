import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import clsx from 'clsx'

export default function Pots() {
    return (
        <div
            className={clsx(
                'px-4 py-6 bg-pfa-beige-100',
                'flex flex-col gap-8'
            )}
        >
            <div className='flex justify-between items-center'>
                <Text fontSize='xxl' fontStyle='bold' color='pfa-grey-900'>
                    Pots
                </Text>
                <Button.Primary>+ Add New Pot</Button.Primary>
            </div>
            <div className='flex flex-col gap-6 md:grid md:grid-cols-2'></div>
        </div>
    )
}
