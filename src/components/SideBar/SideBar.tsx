import clsx from 'clsx'
import Container from '../Container/Container'
import Label from '../Label/Label'

export default function SideBar() {
    return (
        <Container className={clsx('bg-grey-900', 'md:flex-col')} flex='row'>
            <Label leftComponent={<p>Hello</p>} />
            <Label leftComponent={<p>Hello</p>} />
        </Container>
    )
}
