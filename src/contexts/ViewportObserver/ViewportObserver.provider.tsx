import { useEffect, useState } from 'react'
import { ViewportObserver } from './ViewportObserver.context'

const TABLET_THRESHOLD = 768
const MOBILE_THRESHOLD = 375

export default function ViewportObserverProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)

    useEffect(() => {
        const bodyElement = document.querySelector('body')

        if (bodyElement) {
            const observer = new ResizeObserver((entries) => {
                const [bodyEntry] = entries

                if (
                    bodyEntry.contentRect.width <= TABLET_THRESHOLD &&
                    bodyEntry.contentRect.width > MOBILE_THRESHOLD
                ) {
                    setIsTablet(true)
                    setIsMobile(false)
                } else if (bodyEntry.contentRect.width <= MOBILE_THRESHOLD) {
                    setIsTablet(false)
                    setIsMobile(true)
                } else {
                    setIsTablet(false)
                    setIsMobile(false)
                }
            })

            observer.observe(bodyElement)
        }
    }, [])

    return (
        <ViewportObserver.Provider value={{ isMobile, isTablet }}>
            {children}
        </ViewportObserver.Provider>
    )
}
