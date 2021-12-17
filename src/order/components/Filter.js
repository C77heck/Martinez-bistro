import { useContext } from "react"
import { MenuContext } from "../../shared/context/menu-context"

export const FilterLine = props => {

    return <div className='position-center py-2 flex-wrap'>
        {props.filters.map((i, index) => <Filter key={index} filter={i} />)}
    </div>
}

const Filter = props => {
    const { types, setOrderable } = useContext(MenuContext);

    return <div
        className='position-center basic-border border-radius-px-4 filter-element'
        onClick={() => setOrderable(types[props.filter.english])}
    >
        <h2 className='fs-17'>{props.filter.value}</h2>
    </div>
}