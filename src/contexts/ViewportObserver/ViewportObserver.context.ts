import { createContext } from 'react'

export interface IViewportObserver {
    isMobile: boolean
}

export const ViewportObserver = createContext<IViewportObserver>({
    isMobile: false,
})
