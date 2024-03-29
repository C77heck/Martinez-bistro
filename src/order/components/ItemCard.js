import { useContext } from 'react';
import { OrderContext } from '../../shared/context/order-context';

export const ItemCard = props => {
    const { name, description, price } = props.menuItem;
    const { add, remove } = useContext(OrderContext);


    return <div className='display-flex food_cart'>
        <div className='food_cart__image max-height-122 fix-width-150'>
            <img src='/img/food2-mobile.jpg' alt='étel kép' />
        </div>
        <div className='w-100  overflow-hidden'>
            <h3 className='fs-17 fw-800'>{name}</h3>
            <p className='fs-15 overflow-hidden fix-height-42'>{description}</p>
            <div className='hr--light mt-1 display-flex justify-content-between align-items-center fix-height-40'>
                <h3 className='fs-17 fw-800 text-align-right'>{price} Ft</h3>
                {!props.isCheckout ? <button
                    className='buy-button display-flex align-items-center justify-content-center'
                    onClick={() => add(props.menuItem)}
                >
                    <span>Kosárba</span>
                </button> : <button
                    className='remove-button display-flex align-items-center justify-content-center'
                    onClick={() => remove(props.menuItem)}
                >
                    <span>&#10006;</span>
                </button>}
            </div>
        </div>
    </div>
}