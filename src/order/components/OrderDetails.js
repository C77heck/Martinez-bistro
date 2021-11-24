import { useHttpClient } from '../../shared/hooks/http-hook';
import { priceFormat } from '../../utility/helpers';
import { useState, useContext } from 'react';
import { OrderContext } from '../../shared/context/order-context';

export const OrderDetails = props => {
    const { remove, addedItems } = useContext(OrderContext);
    const total = !!addedItems.length ? addedItems.reduce((a, b) => parseFloat(a.price) + parseFloat(b.price)) : 0;
    const neededHeight = total.length * 167;


    return <div className={`fix-width-300 fix-height-${neededHeight} order-details flex-column`}>
        <h2 className='fs-22 text-align-center pb-6'>Kiválasztott termékek</h2>
        <div className='display-flex justify-content-around w-100 basket-header'>
            <h4 className='fs-16'>Termék</h4>
            <h4 className='fs-16'>Ár</h4>
        </div>
        <div>
            {addedItems.map(i => <PickedFood item={i} remove={remove} />)}
        </div>
        <div className='display-flex justify-content-around hr--light mt-2 pt-1 pb-2'>
            <h2 className='fs-22 fw-800'>Összesen:</h2>
            <h2 className='fs-22 fw-800'>{priceFormat(total)}</h2>
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
    const { price, name, amount } = props.item;

    return <div className='display-flex justify-content-around p-px-10'>
        <h5 className='fs-16'>{name}</h5>
        <h5 className='fs-16'>{amount} db</h5>
        <h5 className='fs-16'>{priceFormat(price)}</h5>
        <h5 onClick={() => props.remove(props.item)} className='fs-16'>X</h5>
    </div>;
}