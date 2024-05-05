import { useState } from "react"

export const useLoading = () => {
    const [isLoading, setIsLoadig] = useState(false);

    const show = () => {
        setIsLoadig(true)
    }
    const hide = () => setIsLoadig(false)

    return {
        isLoading,
        show,
        hide
    }
}