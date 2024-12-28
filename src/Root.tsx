import { Context, useContext } from 'react'
import { Outlet } from 'react-router'
import Container from './components/Container/Container'
import SideBar from './components/SideBar/SideBar'
import {
    IViewportObserver,
    ViewportObserver,
} from './contexts/ViewportObserver/ViewportObserver.context'

export default function Root() {
    const { isMobile } = useContext(
        ViewportObserver as Context<IViewportObserver>
    )

    return (
        <Container className='md:flex-row' flex='column' fullHeight>
            {!isMobile && <SideBar />}
            <Outlet />
            {isMobile && <SideBar />}
        </Container>
    )
}
