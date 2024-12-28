import { Outlet } from 'react-router'

export default function Root() {
    return (
        <div>
            <p>The Sidebar</p>
            <Outlet />
        </div>
    )
}
