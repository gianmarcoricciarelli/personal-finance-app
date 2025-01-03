import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import clsx from 'clsx'
import { useNavigate } from 'react-router'

export default function Budgets() {
    const navigate = useNavigate()

    return (
        <div
            className={clsx(
                'px-5 py-6 rounded-xl bg-pfa-white',
                'flex flex-col gap-5'
            )}
        >
            <div className='flex justify-between'>
                <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                    Budgets
                </Text>
                <Button.Tertiary onClick={() => navigate('budgets')}>
                    See Details
                </Button.Tertiary>
            </div>
        </div>
    )
}
