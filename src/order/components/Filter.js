
export const FilterLine = props => {

    return <div className='position-center'>
        {props.filters.map((i, index) => <Filter key={index} filter={i} />)}
    </div>
}

const Filter = props => {
    return <div
        className='position-center basic-border border-radius-px-4 filter-element'
        onClick={() => console.log(props.filter.id)}
    >
        <h2 className='fs-22'>{props.filter.value}</h2>
    </div>
}