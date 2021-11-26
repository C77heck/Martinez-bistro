import { UserDetails } from "../components/UserDetails";
import { useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { MiscData } from '../components/MiscData';

export const Checkout = props => {
    // TODO -> card to display orderd items
    return <div className='full-screen max-width-vw-90 m-3 mt-14 display-flex align-items-center flex-column'>
        <div className='w-px-800 py-2 '>
            <h2>Rendelés átvevője</h2>
            <UserDetails />
        </div>
        <div className='w-px-800 py-2 '>
            <h2>Rendelés átvételének időpontja</h2>
            <UserDetails />
        </div>
        <div className='w-px-800 py-2 '>
            <h2>Egyéb</h2>
            <MiscData />
        </div>
        <div className='w-px-800 py-2 position-center'>
            <OrderButton />
        </div>
    </div>;
}


// TODO -> this button to be for the next page.
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
                    name: props.name,
                    address: props.address,
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
