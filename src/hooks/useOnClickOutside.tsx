import { RefObject, useEffect } from 'react'

export default function useOnClickOutside({
    triggerRef,
    handler,
    elementsToIgnore,
}: {
    triggerRef: RefObject<HTMLElement> | null
    handler: () => void
    elementsToIgnore?: RefObject<HTMLElement>[]
}) {
    useEffect(() => {
        function _handler(event: MouseEvent | TouchEvent) {
            if (triggerRef?.current) {
                if (triggerRef.current.contains(event.target as Node)) {
                    return
                }

                if (
                    elementsToIgnore?.length &&
                    elementsToIgnore.every((element) => element.current) &&
                    elementsToIgnore.some((element) =>
                        element.current?.contains(event.target as Node)
                    )
                ) {
                    return
                }

                handler()
            }
        }

        document.addEventListener('mousedown', _handler)
        document.addEventListener('touchstart', _handler)

        return () => {
            document.removeEventListener('mousedown', _handler)
            document.removeEventListener('touchstart', _handler)
        }
    }, [elementsToIgnore, handler, triggerRef])
}
