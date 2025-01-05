import clsx from 'clsx'
import { FontSize } from '../../types'

interface ProgressBar {
    height: Extract<FontSize, 'xs' | 'xxl'>
    color: string
    percentage: number
}

export default function ProgressBar({
    height,
    percentage,
    color,
}: ProgressBar) {
    return (
        <div className='flex flex-col gap-3'>
            <div
                className={clsx(
                    {
                        'h-2': height === 'xs',
                        'h-8 p-1': height === 'xxl',
                    },
                    'bg-pfa-beige-100 rounded-[4px]'
                )}
            >
                <div
                    style={{
                        width: `${percentage.toFixed(2)}%`,
                        backgroundColor: color,
                    }}
                    className={clsx(
                        {
                            'h-2': height === 'xs',
                            'h-8': height === 'xxl',
                        },
                        'rounded-[4px]'
                    )}
                />
            </div>
        </div>
    )
}
