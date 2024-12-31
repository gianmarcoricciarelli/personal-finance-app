import Button from '@components/Button/Button'
import Label from '@components/Label/Label'
import data from '@data/data.json'
import IconPot from '@images/icon-pot.svg?react'
import clsx from 'clsx'
import { useNavigate } from 'react-router'
import { Pot } from '../../../types'

export default function Pots() {
    const navigate = useNavigate()

    const pots: Pot[] = data.pots
        .sort((a: Pot, b: Pot) => b.total - a.total)
        .slice(1)

    return (
        <div
            className={clsx(
                'w-full px-5 py-6 bg-pfa-white rounded-xl sm:p-8',
                'flex flex-col gap-5'
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
            <div className={clsx('flex flex-col gap-5 sm:flex-row')}>
                <div
                    className={clsx(
                        'h-[110px] p-4 rounded-xl sm:w-[247px]',
                        'bg-pfa-beige-100',
                        'flex gap-4 items-center'
                    )}
                >
                    <IconPot className='w-10 h-10 text-pfa-green' />
                    <Label
                        title={{ text: 'Total Saved', fontSize: 'sm' }}
                        subTitle={{
                            text: '$850',
                            fontSize: 'xl',
                            color: 'pfa-grey-900',
                        }}
                    />
                </div>
                <div className={clsx('sm:grow', 'grid grid-cols-2 gap-4')}>
                    {pots.map((pot) => (
                        <Label
                            key={pot.name}
                            title={{ text: pot.name, fontSize: 'xs' }}
                            subTitle={{
                                text: '$' + pot.total.toString(),
                                fontSize: 'sm',
                                fontStyle: 'bold',
                                color: 'pfa-grey-900',
                            }}
                            tag={pot.theme}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
