import { useHttpClient } from '../../shared/hooks/http-hook';
import { priceFormat } from '../../utility/helpers';
import { useState, useContext } from 'react';
import { OrderContext } from '../../shared/context/order-context';

export const OrderDetails = props => {
    const { remove, addedItems, totalPrice } = useContext(OrderContext);
    const neededHeight = totalPrice.length * 167;
    console.log({ totalPrice });

    return <div className={`fix-width-300 fix-height-${neededHeight} order-details flex-column`}>
        <h2 className='fs-22 text-align-center pb-2'>Kiválasztott termékek</h2>
        <div className='display-flex justify-content-around w-100 basket-header mb-1'>
            <h4 className='fs-16'>Termék</h4>
            <h4 className='fs-16'>Ár</h4>
        </div>
        <div>
            {addedItems.map(i => <PickedFood key={i._id} item={i} remove={remove} />)}
        </div>
        <div className='display-flex justify-content-around hr--light mt-2 pt-1 pb-1'>
            <h2 className='fs-22 fw-800'>Összesen:</h2>
            <h2 className='fs-22 fw-800'>{priceFormat(totalPrice)}</h2>
        </div>
        <div className='position-center fix-height-0'>
            <OrderButton />
        </div>
    </div>
}


const OrderButton = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const order = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ADD_ITEM,
                'POST',
                JSON.stringify({
                    items: props.items,
                    total: props.total,
                    deliverAt: props.deliverAt,
                })
            )
            setMessage(responseData.message)
            setShow(false)

        } catch (err) {
            console.log(err);
        }
    }

    return <button
        className='order-button'
        onClick={order}
    >
        <span>Megrendelem</span>
    </button>
}




const PickedFood = props => {
    const { totalPrice, name, amount } = props.item;

    return <div className='display-flex justify-content-between p-px-10'>
        <div className='fix-width-140'>
            <h5 className='fs-16 white-space-nowrap'>{name}</h5>
        </div>
        <div className='fix-width-30'>
            <h5 className='fs-16'>{amount} db</h5>
        </div>
        <div className='fix-width-50'>
            <h5 className='fs-16'>{priceFormat(totalPrice)}</h5>
        </div>
        <div className='fix-width-20'>
            <h5 onClick={() => props.remove(props.item)} className='fs-16'>&#10006;</h5>
        </div>
    </div>;
}