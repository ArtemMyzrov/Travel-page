import React, { useEffect, useState } from "react"
import { Checkbox, Divider } from "antd"
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import CurrencySelector from "./CurrencySelector"
import styles from './Filters.module.css'

interface FiltersProps {
    onFilterChange: (stops: number[]) => void
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const stopOptions = [0, 1, 2, 3]
    const [selectedStops, setSelectedStops] = useState<number[]>([0])
    const [selectAllChecked, setSelectAllChecked] = useState(false)
    const [hoveredStop, setHoveredStop] = useState<number | null>(null)

    const handleSelectAllChange = (e: CheckboxChangeEvent) => {
        const isChecked = e.target.checked
        setSelectAllChecked(isChecked)
        if (isChecked) {
            setSelectedStops(stopOptions)
        } else {
            setSelectedStops([])
        }
    }

    const handleStopsChange = (checkedValues: number[]) => {
        setSelectedStops(checkedValues)
        setSelectAllChecked(checkedValues.length === stopOptions.length)
    }

    const handleOnlyClick = (value: number) => {
        setSelectedStops([value])
        setSelectAllChecked(false)
    }

    const applyFilter = () => {
        onFilterChange(selectedStops)
    }

    useEffect(() => {
        applyFilter()
    }, [selectedStops])

    return (
        <>
            <div className={styles.currencySelector}>
                <CurrencySelector />
            </div>
            <Divider className={styles.divider} />
            <h3 className={styles.title}>Количество пересадок</h3>
            <Checkbox
                value="all"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
            >
                Все
            </Checkbox>
            <Checkbox.Group
                className={styles.checkboxGroup}
                value={selectedStops}
                onChange={(checkedValues) => handleStopsChange(checkedValues as number[])}
            >
                {stopOptions.map((stop) => (
                    <div
                        key={stop}
                        className={styles.checkboxItem}
                        onMouseEnter={() => setHoveredStop(stop)}
                        onMouseLeave={() => setHoveredStop(null)}
                    >
                        <Checkbox value={stop}>
                            {stop === 0 ? 'Без пересадок' : `${stop} пересадка`}
                        </Checkbox>
                        {hoveredStop === stop && stop !== null && (
                            <span
                                className={styles.onlyText}
                                onClick={() => handleOnlyClick(stop)}
                            >
                                ТОЛЬКО
                            </span>
                        )}
                    </div>
                ))}
            </Checkbox.Group>
            <Divider className={styles.divider} />
        </>
    )
}

export default Filters
