import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import TextBox from '@components/TextBox/TextBox'
import data from '@data/data.json'
import IconPot from '@images/icon-pot.svg?react'
import clsx from 'clsx'
import { useNavigate } from 'react-router'
import { Color, Pot } from '../../../types'

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
                <Text fontSize='xl' fontStyle='bold' color='pfa-grey-900'>
                    Pots
                </Text>
                <Button.Tertiary onClick={() => navigate('/pots')}>
                    See Details
                </Button.Tertiary>
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
                    <TextBox.WithSubText
                        title={
                            <TextBox.Text fontSize='sm'>
                                Total Saved
                            </TextBox.Text>
                        }
                        subTitle={
                            <TextBox.Text fontSize='xl' color='pfa-grey-900'>
                                $850
                            </TextBox.Text>
                        }
                    />
                </div>
                <div className={clsx('sm:grow', 'grid grid-cols-2 gap-4')}>
                    {pots.map((pot) => (
                        <TextBox.WithTag
                            key={pot.name}
                            color={pot.theme as Color}
                        >
                            <TextBox.WithSubText
                                title={<TextBox.Text>{pot.name}</TextBox.Text>}
                                subTitle={
                                    <TextBox.Text
                                        fontSize='sm'
                                        fontStyle='bold'
                                        color='pfa-grey-900'
                                    >
                                        {'$' + pot.total.toString()}
                                    </TextBox.Text>
                                }
                            />
                        </TextBox.WithTag>
                    ))}
                </div>
            </div>
        </div>
    )
}
