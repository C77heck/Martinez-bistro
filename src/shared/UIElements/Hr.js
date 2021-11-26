
const getType = (type) => {
    switch (type) {
        case 'light':
            return 'hr--light';
        case 'dark':
            return 'hr--dark';
        default:
            return 'hr--basic';
    }
}

export const Hr = props => {



    return <div className={`${getType(props.type)} w-${props.size}`} />
}
