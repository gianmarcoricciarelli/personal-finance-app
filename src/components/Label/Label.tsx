interface Label {
    leftComponent: React.ReactNode
}

export default function Label({ leftComponent }: Label) {
    return <div>{leftComponent}</div>
}
