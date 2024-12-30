import SideBar from '@components/SideBar/SideBar'
import {
    IViewportObserver,
    ViewportObserver,
} from '@contexts/ViewportObserver/ViewportObserver.context'
import { Context, useContext } from 'react'
import { Outlet } from 'react-router'

export default function Root() {
    const { isMobile, isTablet } = useContext(
        ViewportObserver as Context<IViewportObserver>
    )

    return (
        <div className='h-full flex flex-col md:flex-row'>
            {!(isMobile || isTablet) && <SideBar />}
            <Outlet />
            {(isMobile || isTablet) && <SideBar />}
        </div>
    )
}
