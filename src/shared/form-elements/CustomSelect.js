import React from 'react';

import './CustomSelect.css'



const CustomSelect = props => {




    return (
        <div className="custom-select">
            <label htmlFor={props.id}>{props.label}</label>
            <select id={props.id} onChange={props.onChange}>
                <option value={props.initialValue}>{props.initialValue}</option>
                {props.selection.map(i => {
                    return <option key={i.id} value={i.english}>{i.value}</option>
                })}
            </select>
        </div>
    )
}

export default CustomSelect;
