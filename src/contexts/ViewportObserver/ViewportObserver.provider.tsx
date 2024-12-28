import { useEffect, useState } from 'react'
import { ViewportObserver } from './ViewportObserver.context'

const MOBILE_THRESHOLD = 768

export default function ViewportObserverProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const bodyElement = document.querySelector('body')

        if (bodyElement) {
            const observer = new ResizeObserver((entries) => {
                const [bodyEntry] = entries

                if (bodyEntry.contentRect.width <= MOBILE_THRESHOLD) {
                    setIsMobile(true)
                } else {
                    setIsMobile(false)
                }
            })

            observer.observe(bodyElement)
        }
    }, [])

    return (
        <ViewportObserver.Provider value={{ isMobile }}>
            {children}
        </ViewportObserver.Provider>
    )
}
