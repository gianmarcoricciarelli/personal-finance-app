import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { FontSize } from '../../types'

interface ProgressBar {
    height: Extract<FontSize, 'xs' | 'xxl'>
    percentages: number | number[]
    colors: string | string[]
    total?: number
}

export default function ProgressBar({
    height,
    percentages,
    colors,
    total = 100,
}: ProgressBar) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [dividerPercentage, setDividerPercentage] = useState(0)

    const stackedProgressBars = typeof percentages !== 'number'

    useEffect(() => {
        if (containerRef.current && stackedProgressBars) {
            const containerWidth = containerRef.current.clientWidth
            const _dividerPercentage = (100 * 2) / containerWidth
            setDividerPercentage(_dividerPercentage)
        }
    }, [percentages, stackedProgressBars])

    return (
        <div ref={containerRef} className='flex flex-col gap-3'>
            <div
                className={clsx(
                    {
                        'h-2': height === 'xs',
                        'h-8 p-1': height === 'xxl',
                    },
                    'bg-pfa-beige-100 rounded-[4px]'
                )}
            >
                {!stackedProgressBars && (
                    <div
                        style={{
                            width: `${((percentages / total) * 100).toFixed(
                                2
                            )}%`,
                            backgroundColor: colors as string,
                        }}
                        className={clsx(
                            {
                                'h-2': height === 'xs',
                                'h-8': height === 'xxl',
                            },
                            'rounded-[4px]'
                        )}
                    />
                )}
                {stackedProgressBars && (
                    <div className='flex'>
                        {percentages.map((percentage, index) => {
                            let _percentage = (percentage / total) * 100

                            if (
                                _percentage !== 0 &&
                                index !== percentages.length - 1 &&
                                percentages[index + 1] !== 0
                            ) {
                                _percentage = _percentage - dividerPercentage
                            }

                            return (
                                <>
                                    <div
                                        key={index}
                                        style={{
                                            width: `${_percentage}%`,
                                            backgroundColor: colors[index],
                                        }}
                                        className={clsx(
                                            {
                                                'h-2': height === 'xs',
                                                'h-8': height === 'xxl',
                                                'rounded-[4px]':
                                                    (index === 0 &&
                                                        percentages.filter(
                                                            (p) => p !== 0
                                                        ).length === 1) ||
                                                    percentages[0] === 0,
                                                'rounded-l-[4px]': index === 0,
                                                'rounded-r-[4px]':
                                                    index ===
                                                    percentages.length - 1,
                                            },
                                            'transition-all duration-300'
                                        )}
                                    />
                                    {index !== percentages.length - 1 &&
                                        percentages.filter((p) => p !== 0)
                                            .length !== 1 && (
                                            <div
                                                style={{
                                                    width: `${dividerPercentage}%`,
                                                }}
                                                className={clsx(
                                                    'bg-pfa-white',
                                                    {
                                                        'h-2': height === 'xs',
                                                        'h-8': height === 'xxl',
                                                    }
                                                )}
                                            />
                                        )}
                                </>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
