export const FoodItem = (props) => {
    // TODO -> pass on the data.
    return <div className='layout__item'>
        {location.pathname === '/admin/menu' ? <AddItem foodType='entries'/> : null}

        {types.mexicanos && <h2 className='heading-secondary'>Platillos Mexicanos</h2>}

        {types.mexicanos && types.mexicanos.map(i => {
            return (
                <div
                    key={i._id}
                    className={`${location.pathname === '/admin/menu' ? 'menu-item-wrapper hover-opacity' : null}`}
                    onClick={props.onClick}
                >
                    <div className='food-item'>
                        <p className='paragraph paragraph--menu flex-basis-70'>{i.name}</p>
                        <p className='paragraph paragraph--menu white-space-nowrap flex-basis-30'>{i.price} Ft/adag</p>
                        {
                            location.pathname === '/admin/menu' && <div
                                id={i.identifier}
                                className={'menu-admin-view'}
                            />
                        }
                    </div>
                    <p>{i.description}</p>
                </div>
            )
        })}

    </div>;
}
