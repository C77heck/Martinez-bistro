import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';
import { priceFormat } from "../../utility/helpers";

export const Orders = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const [orders, setOrders] = useState([]);
    const { isLoggedIn, token } = useContext(AuthContext);

    useEffect(() => {
        console.log(!!token);
        if (!!token) {
            fetchOrders()
        }
    }, [token])

    const fetchOrders = async () => {
        try {
            const responseData = await sendRequest(process.env.REACT_APP_GET_ORDERS,
                'GET', null, {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            });
            setOrders(responseData.orders || []);
        } catch (e) {
            console.log(e);
            // window.location.reload();
        }
    }
    console.log(orders);

    return <div className='full-screen display-flex justify-content-center center'>

        <div className='max-width-900 mt-10'>
            <h2 className='fs-40 px-3' >Rendelések</h2>

            {!!orders.length && orders.map(i => <OrderCard order={i} />)}
        </div>
    </div>;
}

const OrderCard = props => {
    const { email, items, name, note, phone, pickupDate, status, tax } = props.order;
    return <div className='display-flex food_cart hover-background-white p-2 m-3'>
        <div className='food_details w-100'>
            <h3 className='fs-17 fw-800'>Megrendelő neve: {name}</h3>
            <h3 className='fs-15 fix-height-42 overflow-hidden'>E-mail cím: {email}</h3>
            <h3 className='fs-15 fix-height-42 overflow-hidden'>Telefonszám: {phone}</h3>
            <h3 className='fs-15 fix-height-42 overflow-hidden'>Végösszeg: {priceFormat(324132)}</h3>
            <h3 className='fs-15 fix-height-42 overflow-hidden'>Áfás számla: {tax ? 'Igen' : 'Nem'}</h3>
            <h3 className='fs-15 fix-height-42 overflow-hidden'>Felvétel időpontja: {pickupDate}</h3>
            <h3 className='fs-15 fix-height-42 overflow-hidden'>Megjegyzés: {note}</h3>
        </div>
    </div>;
}