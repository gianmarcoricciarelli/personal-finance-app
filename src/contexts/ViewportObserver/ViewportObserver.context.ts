import { createContext } from 'react'

export interface IViewportObserver {
    isMobile: boolean
    isTablet: boolean
}

export const ViewportObserver = createContext<IViewportObserver>({
    isMobile: false,
    isTablet: false,
})
