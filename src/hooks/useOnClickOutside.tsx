import { RefObject, useEffect } from 'react'

export default function useOnClickOutside<DomElementType extends HTMLElement>(
    ref: RefObject<DomElementType> | null,
    handler: () => void
) {
    useEffect(() => {
        function _handler(event: MouseEvent | TouchEvent) {
            if (ref?.current) {
                if (!ref.current.contains(event.target as Node)) {
                    handler()
                }
            }
        }

        document.addEventListener('mousedown', _handler)
        document.addEventListener('touchstart', _handler)

        return () => {
            document.removeEventListener('mousedown', _handler)
            document.removeEventListener('touchstart', _handler)
        }
    }, [handler, ref])
}
