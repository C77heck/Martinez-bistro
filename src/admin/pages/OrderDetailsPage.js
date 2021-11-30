
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Hr } from "../../shared/UIElements/Hr";
import { priceFormat, redirect } from "../../utility/helpers";

export const OrderDetailsPage = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const [order, setOrder] = useState([]);
    const { isLoggedIn, token } = useContext(AuthContext);
    const { id } = useParams();
    useEffect(() => {
        fetchOrder()

        if (isLoggedIn && !!token) {
        }
    }, [token])

    const fetchOrder = async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_GET_ORDER}${id}`,
                'GET', null, {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            });
            setOrder(responseData.orders || []);
        } catch (e) {
            console.log(e);
            // window.location.reload();
        }
    }
    console.log(order);

    return <div className='full-screen display-flex justify-content-center center'>

        <div className='max-width-1000 w-100 mt-10'>
            <h2 className='fs-40 color--light text-align-center' >rendelés részletek</h2>
            <div className='display-flex flex-wrap justify-content-center'>
                {!!order.length && order.map(i => <h1>items</h1>)}
            </div>
        </div>
    </div>;
}
