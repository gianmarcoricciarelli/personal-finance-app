type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
type FonStyle = 'normal' | 'bold'
type Color = 'pfa-grey-500' | 'pfa-grey-900'

type LabelText = {
    text: string
    fontSize?: FontSize
    fontStyle?: FonStyle
    color?: Color
}

interface Label {
    title: LabelText
    subTitle: LabelText
    gap?: '1' | '2' | '3'
    tag?: string
}

export default function Label({ title, subTitle, gap = '1', tag }: Label) {
    const _titleFontSize: FontSize | '[32px]' =
        (title.fontSize === 'xl' ? '[32px]' : title.fontSize) || 'xs'
    const _titleFontStyle: FonStyle = title.fontStyle || 'normal'
    const _titleColor: Color = title.color || 'pfa-grey-500'

    const _subTitleFontSize: FontSize | '[32px]' =
        (subTitle.fontSize === 'xl' ? '[32px]' : subTitle.fontSize) || 'xs'
    const _subTitleFontStyle: FonStyle = subTitle.fontStyle || 'normal'
    const _subTitleColor: Color = subTitle.color || 'pfa-grey-500'

    const labelText = (
        <div className={`flex flex-col gap-${gap}`}>
            <span
                className={`text-${_titleFontSize} text-${_titleColor} font-${_titleFontStyle}`}
            >
                {title.text}
            </span>
            <span
                className={`text-${_subTitleFontSize} text-${_subTitleColor} font-${_subTitleFontStyle}`}
            >
                {subTitle.text}
            </span>
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
