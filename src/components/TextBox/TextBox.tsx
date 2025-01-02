import Text from '@components/Text/Text'
import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'
import { Color, Gap } from '../../types'

function Tag({ color }: { color: Color }) {
    return (
        <div style={{ backgroundColor: color }} className={`w-1 rounded-lg`} />
    )
}

function Container({ className, children }: ComponentProps<'div'>) {
    return <div className={className}>{children}</div>
}

function WithTag({
    color,
    children,
}: {
    className?: string
    gap?: Gap
    color: Color
    children: ReactNode
}) {
    return (
        <Container className='flex gap-4'>
            <Tag color={color} />
            {children}
        </Container>
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
        <Container className={clsx(className, 'flex flex-col gap-1')}>
            {title}
            {subTitle}
        </Container>
    )
}

const TextBox = {
    Container,
    Tag,
    Text,
    WithSubLabel,
    WithTag,
}

export default TextBox
