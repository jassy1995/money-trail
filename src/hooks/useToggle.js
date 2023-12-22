import { useState } from "react"
export default function useToggle(defaultValue = false) {
    const [value, setValue] = useState(defaultValue)

    const toggleValue = (value) => {
        setValue(currentValue => !currentValue)
    }

    return [value, toggleValue]
}

