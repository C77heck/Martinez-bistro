import AddItem from '../../admin/components/AddItem';
import {useHistory} from 'react-router-dom';

export const FoodItem = (props) => {
    const {location} = useHistory();

    const {types, onClick, title} = props;
    // TODO -> pass on the data.
    return <div className='layout__item'>
        {location.pathname === '/admin/menu' ? <AddItem foodType='entries'/> : null}

        {types && <h2 className='heading-secondary'>{title}</h2>}

        {types && types.map(i => {
            return (
                <div
                    key={i._id}
                    className={`${location.pathname === '/admin/menu' ? 'menu-item-wrapper hover-opacity' : null}`}
                    onClick={props.onClick}
                >
                    <div className='food-item'>
                        <div className={'flex-basis-80'}>
                            <p className='paragraph paragraph--menu'>{i.name}</p>
                            <p className={''}>{i.description}</p>
                        </div>
                        <div className={'flex-basis-20'}>
                            <p className='paragraph paragraph--menu white-space-nowrap flex-basis-30 text-align-right'>{i.price} Ft</p>
                        </div>

                        {location.pathname === '/admin/menu' && <div
                            id={i.identifier}
                            className={'menu-admin-view'}
                        />}
                    </div>
                </div>
            )
        })}

    </div>;
}
