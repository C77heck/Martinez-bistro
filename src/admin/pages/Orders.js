import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Hr } from "../../shared/UIElements/Hr";
import { priceFormat, shorten } from "../../utility/helpers";
import { OrderDetailsModal } from "../components/OrderDetailsModal";

export const Orders = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const [orders, setOrders] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [finished, setFinished] = useState([]);
    const [type, setType] = useState('orders');
    const { isLoggedIn, token } = useContext(AuthContext);

    useEffect(() => {
        console.log(isLoggedIn && !!token);
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

            const { finished, rejected, orders } = sortOrders(responseData?.orders || []);
            setOrders(orders);
            setRejected(rejected);
            setFinished(finished);
        } catch (e) {
            console.log(e);
        }
    }

    const selected = () => {
        console.log('got called', type);
        switch (type) {
            case 'rejected':
                return rejected;
            case 'finished':
                return finished;
            default:
                return orders;
        }
    }
    // TODO -> we need here a tab selector that controls which one gets mapped out.
    return <div className='full-screen display-flex justify-content-center center flex-column'>
        <div className='position-center py-2'>
            <div
                className={`position-center basic-border border-radius-px-4 filter-element fs-19 ${type === 'finished' ? 'background--green' : ''}`}
                onClick={() => setType('finished')}
            >Befejezett</div>
            <div
                className={`position-center basic-border border-radius-px-4 filter-element fs-19 ${type === 'rejected' ? 'background--green' : ''}`}
                onClick={() => setType('rejected')}
            >Elutasítva</div>
            <div
                className={`position-center basic-border border-radius-px-4 filter-element fs-19 ${type === 'orders' ? 'background--green' : ''}`}
                onClick={() => setType('orders')}
            >Rendelések</div>
        </div>
        <div className='max-width-1000 w-100 mt-10'>
            <h2 className='fs-40 color--light text-align-center' >Rendelések</h2>
            <div className='display-flex flex-wrap justify-content-center'>
                {!!selected().length ? selected().map((i, index) => <OrderCard key={index} order={i} />) : <h2 className='fs-30 py-3'>Jelenleg nincs rendelés</h2>}

            </div>
        </div>
    </div>;
}

const OrderCard = props => {
    const { email, items, name, note, phone, pickupDate, status, tax, _id } = props.order;
    const [show, setShow] = useState(false);
    const onCancelHandler = (e) => {
        e.stopPropagation();
        setShow(false);
    }
    const onClickHandler = (e) => {
        e.stopPropagation();
        setShow(true);
    }

    return <div
        onClick={onClickHandler}
        className='display-flex flex-column food_cart hover-background-white mr-2 fix-width-300 order-card'
    >
        <div className='w-100 p-1 order-card--header'>
            <h3 className='fs-25 fw-800 color--light'>Felvétel időpontja: <span className='fw-800 fs-25 color--dark'>
                {pickupDate} </span></h3>
        </div>
        <div className='food_details w-100 p-2'>
            <OrderText propertyName='Megrendelő neve' value={name} />
            <Hr type={'light'} size={80} className='my-1' />
            <OrderText propertyName='E-mail' value={email} />
            <Hr type={'light'} size={80} className='my-1' />
            <OrderText propertyName='Telefonszám' value={phone} />
            <Hr type={'light'} size={80} className='my-1' />
            <OrderText propertyName='Végösszeg' value={priceFormat(324132)} />
            <Hr type={'light'} size={80} className='my-1' />
            <OrderText propertyName='Áfás számla' value={tax ? 'Igen' : 'Nem'} />
            <Hr type={'light'} size={80} className='my-1' />
            <OrderText propertyName='Megjegyzés' value={shorten(note, 60)} />
        </div>
        <OrderDetailsModal
            show={show}
            onClear={onCancelHandler}
            order={props.order}
        />
    </div>;
}

export const OrderText = props => {
    const { propertyName, value } = props;

    return <div className='display-flex flex-column'>
        <h3 className='fs-20 color--light'>{propertyName}:</h3>
        <h3 className='fw-800 fs-21 color--dark'>{value}</h3>
    </div>;
}


const sortOrders = orders => {
    const rejected = [];
    const finished = [];
    const unfinishedOrders = [];

    for (const order of orders) {
        if (order.status.isRejected) {
            rejected.push(order);
        } else if (order.status.isDone) {
            finished.push(order);
        } else {
            unfinishedOrders.push(order);
        }
    }

    return { rejected, finished, orders: unfinishedOrders };
}