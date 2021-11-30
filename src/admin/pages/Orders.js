import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Hr } from "../../shared/UIElements/Hr";
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

        <div className='max-width-1000 w-100 mt-10'>
            <h2 className='fs-40 color--light text-align-center' >Rendelések</h2>
            <div className='display-flex flex-wrap justify-content-center'>
                {!!orders.length && orders.map(i => <OrderCard order={i} />)}
            </div>
        </div>
    </div>;
}

const OrderCard = props => {
    const { email, items, name, note, phone, pickupDate, status, tax } = props.order;
    return <div className='display-flex flex-column food_cart hover-background-white mr-2 fix-width-300 order-card'>
        <div className='w-100 p-1 order-card--header'>
            <h3 className='fs-25 fw-800 color--light'>Felvétel időpontja: <span className='fw-800 fs-25 color--dark'>
                {pickupDate} </span></h3>
        </div>
        <div className='food_details w-100 p-2'>

            <h3 className='fs-20 color--light'>Megrendelő neve: <span className='fw-800 fs-21 color--dark'>
                {name} </span></h3>
            <Hr type={'light'} size={80} className='my-1' />
            <h3 className='fs-20 color--light'>E-mail: <span className='fw-800 fs-21 color--dark'>
                {email} </span></h3>
            <Hr type={'light'} size={80} className='msy-1 ' />
            <h3 className='fs-20 color--light'>Telefonszám: <span className='fw-800 fs-21 color--dark'>
                {phone}  </span></h3>
            <Hr type={'light'} size={80} className='my-1' />
            <h3 className='fs-20 color--light'>Végösszeg: <span className='fw-800 fs-21 color--dark'>
                {priceFormat(324132)} </span></h3>
            <Hr type={'light'} size={80} className='my-1' />
            <h3 className='fs-20 color--light'>Áfás számla: <span className='fw-800 fs-21 color--dark'>
                {tax ? 'Igen' : 'Nem'} </span></h3>
            <Hr type={'light'} size={80} className='my-1' />
            <h3 className='fs-20 color--light'>Megjegyzés: <span className='fw-800 fs-21 color--dark'>
                {note}  </span></h3>
        </div>
    </div>;
}