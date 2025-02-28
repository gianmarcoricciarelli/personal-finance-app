import SideBar from '@components/SideBar/SideBar'
import { ViewportObserver } from '@contexts/ViewportObserver/ViewportObserver.context'
import { useContext } from 'react'
import { Outlet } from 'react-router'

export default function Root() {
    const { isMobile, isTablet } = useContext(ViewportObserver)

    return (
        <div className='h-full flex flex-col mobile:max-tablet:flex-col tablet:flex-row'>
            {!(isMobile || isTablet) && <SideBar />}
            <Outlet />
            {(isMobile || isTablet) && <SideBar />}
        </div>
    )
}
