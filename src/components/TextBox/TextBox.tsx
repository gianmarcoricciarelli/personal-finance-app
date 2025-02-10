import Text from '@components/Text/Text'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { Color } from '../../types'

function Tag({ color }: { color: Color | string }) {
    return (
        <div style={{ backgroundColor: color }} className={`w-1 rounded-lg`} />
    )
}

function WithTag({
    className,
    color,
    children
}: {
    color: Color | string
    children: ReactNode
    className?: string
}) {
    return (
        <div className={clsx(className, 'flex gap-4')}>
            <Tag color={color} />
            {children}
        </div>
    )
}

function WithSubText({
    title,
    subTitle,
    className
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
    WithSubText,
    WithTag
}

export default TextBox
