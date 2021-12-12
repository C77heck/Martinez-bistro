import { useContext, useEffect, useState } from 'react';
import Modal from '../../shared/UIElements/Modal';
import { PickedFood } from '../../order/components/OrderDetails';
import { OrderText } from '../pages/Orders';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from "../../shared/context/auth-context";
import { Hr } from '../../shared/UIElements/Hr';
import { priceFormat, shorten } from "../../utility/helpers";

export const OrderDetailsModal = props => {
    const { email, name, note, phone, pickupDate, status, tax, _id } = props.order;
    const { sendRequest, error, clearError } = useHttpClient();
    const { isLoggedIn, token } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const fetchFoodItems = async () => {
        try {
            const foodItems = await sendRequest(process.env.REACT_APP_GET_ORDER + _id,
                'GET',
                null,
                {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                });
            const fItems = (foodItems.menuItems || []).map(i => ({ ...i.item, amount: i.amount, totalPrice: parseInt(i.item.price, 10) * parseInt(i.amount, 10) }));
            const totalPrice = fItems.map(i => i.totalPrice).reduce((a, b) => a + b);
            setTotal(totalPrice);
            setItems(fItems);
            setOrderDetails(foodItems.order);
        } catch (e) {
            console.log(e);
        }
    }

    console.log(orderDetails);

    return <Modal
        show={props.show}
        onCancel={props.onClear}
        className='modal--order'
    >
        <div className='max-width-650 margin-auto'>
            <div className='food-items'>
                <div className='px-4'>
                    {(items || []).map(i => <PickedFood key={i._id} item={i} />)}
                </div>
                <div className='display-flex justify-content-around hr--light mt-2 pt-1 pb-1'>
                    <h2 className='fs-22 fw-800'>Összesen:</h2>
                    <h2 className='fs-22 fw-800'>{priceFormat(total)}</h2>
                </div>
            </div>
            <div className='position-center flex-column'>
                <div className='display-flex justify-content-around align-items-center w-100'>
                    <OrderText propertyName='Megrendelő neve' value={orderDetails.name} />
                    <OrderText propertyName='E-mail' value={orderDetails.email} />
                </div>
                <Hr type={'light'} size={80} className='my-1' />
                <div className='display-flex justify-content-around align-items-center w-100'>
                    <OrderText propertyName='Telefonszám' value={orderDetails.phone} />
                    <OrderText propertyName='Áfás számla' value={tax ? 'Igen' : 'Nem'} />
                </div>
                <Hr type={'light'} size={80} className='my-1' />
                <OrderText propertyName='Megjegyzés' value={orderDetails.note} />
            </div>
            <div className='display-flex justify-content-around align-items-center'>
                <FinishButton id={_id} />
                <RejectButton id={_id} />
            </div>
        </div>
    </Modal >;
}

const FinishButton = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const { isLoggedIn, token } = useContext(AuthContext);
    const finish = async () => {
        try {
            const foodItems = await sendRequest(process.env.REACT_APP_FINISH + props.id,
                'PATCH',
                {},
                {
                    Authorization: 'Bearer ' + token
                });
        } catch (e) {
            console.log(e, process.env.REACT_APP_FINISH);
        }
    };

    return <button
        className='cursor-pointer order-button background--green'
        onClick={finish}
    >Kész</button>
}

const RejectButton = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const { isLoggedIn, token } = useContext(AuthContext);
    const rejectOrder = async () => {
        try {
            await sendRequest(process.env.REACT_APP_REJECT + props.id,
                'PATCH',
                {},
                {
                    Authorization: 'Bearer ' + token
                });
        } catch (e) {
            console.log(e, process.env.REACT_APP_REJECT);
        }
    };

    return <button
        className='cursor-pointer order-button background--red'
        onClick={rejectOrder}
    >Elutasít</button>
}