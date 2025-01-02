import Text from '@components/Text/Text'
import clsx from 'clsx'
import { Color, FontSize, FontStyle } from '../../types'

type LabelText = {
    text: string
    fontSize?: FontSize
    fontStyle?: FontStyle
    color?: Color
}

interface Label {
    className?: string
    title: LabelText
    subTitle: LabelText
    gap?: '1' | '2' | '3'
    tag?: string
}

export default function Label({
    className,
    title,
    subTitle,
    gap = '1',
    tag,
}: Label) {
    const labelText = (
        <div className={clsx(className, `flex flex-col gap-${gap}`)}>
            <Text
                fontSize={title.fontSize}
                fontStyle={title.fontStyle}
                color={title.color}
            >
                {title.text}
            </Text>
            <Text
                fontSize={subTitle.fontSize}
                fontStyle={subTitle.fontStyle}
                color={subTitle.color}
            >
                {subTitle.text}
            </Text>
        </div>
    )

    return tag ? (
        <div className='flex gap-4'>
            <div
                style={{ backgroundColor: tag }}
                className={`w-1 rounded-lg`}
            />
            {labelText}
        </div>
    ) : (
        labelText
    )
}
