import Button from '@components/Button/Button'
import clsx from 'clsx'
import { useNavigate } from 'react-router'

export default function Pots() {
    const navigate = useNavigate()

    return (
        <div
            className={clsx(
                'w-full px-5 py-6 bg-pfa-white rounded-xl sm:p-8',
                'flex flex-col gap-5 sm:flex-row'
            )}
        >
            <div
                className={clsx('w-full', 'flex justify-between items-center')}
            >
                <span className='text-xl font-bold text-pfa-grey-900'>
                    Pots
                </span>
                <Button variant='tertiary' onClick={() => navigate('/pots')}>
                    See Details
                </Button>
            </div>
        </div>
    )
}
