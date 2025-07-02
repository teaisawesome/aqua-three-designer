import { useState, useEffect } from "react";

export default function TransformTypeInput({value, transformType, coordinateType, onCommit}) {
    const toUserUnits = (real) => Math.round(real * 1000)
    const fromUserUnits = (user) => user / 1000

    const [inputValue, setInputValue] = useState(toUserUnits(value).toString());

    const coordinateTypeColor = (coordinateType) => {
        switch (coordinateType) {
            case 'x':
                return 'border-red-500';
            case 'y':
                return 'border-green-500';
            case 'z':
                return 'border-blue-500';
        }
    };

    useEffect(() => {
        setInputValue(toUserUnits(value).toString())
    }, [value])

    const handleChange = (e) => {
        const raw = e.target.value
        if (/^-?\d*$/.test(raw) || raw === "") {
            setInputValue(raw)
        }
    }

    const handleBlur = () => {
        const parsed = parseInt(inputValue, 10)
        if (!isNaN(parsed)) {
            onCommit(fromUserUnits(parsed))
        } else {
            setInputValue(toUserUnits(value).toString())
        }
    }

    return (
        <input
            type="text"
            inputMode="numeric"
            className={`bg-sky-900 appearance-none h-8 border-l-4 ${coordinateTypeColor(coordinateType)} rounded w-full pl-1 leading-tight text-white`}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );

}