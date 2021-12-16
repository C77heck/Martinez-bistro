import CustomSelect from "../../shared/form-elements/CustomSelect"
import { useState, useEffect } from 'react';
const availableTimes = (start, finish) => {
    // 11 -> 20
    let pickupOptions = [];
    for (let i = 0; i < finish - start; i++) {
        const whole = `${start + i}:00`;
        const half = `${start + i}:30`;
        pickupOptions = [...pickupOptions, { value: whole, english: whole, id: whole }, { value: half, english: half, id: half }]
    }

    return pickupOptions;
}

export const DatePicker = props => {
    const [pickupTime, setPickupTime] = useState('');
    const options = availableTimes(11, 20);
    const onChangeHandler = e => {
        const value = e.target.value;
        setPickupTime(value)
    }

    useEffect(() => {
        props.getValues && props.getValues(pickupTime, !!pickupTime);
    }, [pickupTime, setPickupTime])

    return <div>
        <CustomSelect
            onChange={onChangeHandler}
            initialValue={'--:--'}
            selection={options}
            id='custom-select1'
            label='Átvétel időpontja'
            labelClass='fs-17'
            selectClass='margin-unset fs-20 h-px-30 fw-800'
        />
    </div>
}