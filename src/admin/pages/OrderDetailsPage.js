
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router";
import { PickedFood } from "../../order/components/OrderDetails";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Hr } from "../../shared/UIElements/Hr";
import { priceFormat, redirect } from "../../utility/helpers";

const FoodCard = props => {
    const { id, amount } = props;
    const [item, setItem] = useState(null);
    const { sendRequest, error, clearError } = useHttpClient();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetcFoodItem()
    }, [])

    const fetcFoodItem = async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_GET_FOOD}${id}/${amount}`,
                'GET', null, {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            });
            setItem(responseData.item || null);
        } catch (e) {
            console.log(e);
            // window.location.reload();
        }
    }

    return <PickedFood item={item} />
}

export const OrderDetailsPage = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
    const { isLoggedIn, token } = useContext(AuthContext);
    const { id } = useParams();
    useEffect(() => {
        fetchOrder()

        // if (isLoggedIn && !!token) {
        // }
    }, [token])

    const fetchOrder = async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_GET_ORDER}${id}`,
                'GET', null, {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            });
            setOrder(responseData.order || []);
            setItems(JSON.parse(responseData.order.items || ''));
        } catch (e) {
            console.log(e);
            // window.location.reload();
        }
    }
    console.log({ order, items });

    return <div className='full-screen display-flex justify-content-center center'>
        <div className='max-width-1000 w-100 mt-10'>
            <h2 className='fs-40 color--light text-align-center' >rendelés részletek</h2>
            <div className='display-flex flex-wrap justify-content-center'>
                {!!items && !!items.length && items.map(i => <fetchOrder id={i.id} amount={i.amount} />)}
            </div>
        </div>
    </div>;
}
