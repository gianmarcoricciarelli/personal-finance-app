import { Context, useContext } from 'react'
import { Outlet } from 'react-router'
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
        <div className='h-full flex flex-col md:flex-row'>
            {!isMobile && <SideBar />}
            <Outlet />
            {isMobile && <SideBar />}
        </div>
    )
}
