import Text from '@components/Text/Text'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { Color } from '../../types'

function Tag({ color }: { color: Color }) {
    return (
        <div style={{ backgroundColor: color }} className={`w-1 rounded-lg`} />
    )
}

function WithTag({ color, children }: { color: Color; children: ReactNode }) {
    return (
        <div className='flex gap-4'>
            <Tag color={color} />
            {children}
        </div>
    )
}

function WithSubLabel({
    title,
    subTitle,
    className,
}: {
    title: ReactNode
    subTitle: ReactNode
    className?: string
}) {
    return (
        <div className={clsx(className, 'flex flex-col gap-1')}>
            {title}
            {subTitle}
        </div>
    )
}

const TextBox = {
    Tag,
    Text,
    WithSubLabel,
    WithTag,
}

export default TextBox
