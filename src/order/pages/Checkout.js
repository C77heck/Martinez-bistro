import { UserDetails } from "../components/UserDetails";
import { useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { MiscData } from '../components/MiscData';
import { DatePicker } from "../components/DatePicker";
import { Hr } from "../../shared/UIElements/Hr";

export const Checkout = props => {
    let data = {
        userData: [],
        pickup: '',
        misc: []
    };
    const getValues = (values, prop) => {
        console.log({ data, values, prop });
        data[prop] = values;
    }
    // TODO -> card to display orderd items
    return <div className='full-screen max-width-vw-90 m-3 mt-14 display-flex align-items-center flex-column'>
        <div className='w-px-800 py-2 '>
            <h2 className='fs-22 fw-800'>Rendelés átvevője</h2>
            <UserDetails getValues={(values) => getValues(values, 'userData')} />
        </div>
        <Hr type={'light'} size={80} />
        <div className='w-px-800 py-2 display-flex justify-content-start flex-column align-items-baseline'>
            <h2 className='fs-22 fw-800'>Rendelés átvételének időpontja</h2>
            <DatePicker getValues={(values) => getValues(values, 'pickup')} />
        </div>
        <Hr type={'light'} size={80} />
        <div className='w-px-800 py-2 '>
            <h2 className='fs-22 fw-800'>Egyéb</h2>
            <MiscData getValues={(values) => getValues(values, 'misc')} />
        </div>
        <Hr type={'light'} size={80} />
        <div className='w-px-800 py-2 position-center'>
            <OrderButton getData={() => data} />
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
            const getData = props.getData();
            console.log(getData);
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
