import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';

export const Orders = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const [orders, setOrders] = useState([]);
    const { isLoggedIn, token } = useContext(AuthContext);

    useEffect(() => {
        if (!!token) {
            (async () => {
                try {
                    const responseData = await sendRequest(process.env.REACT_APP_GET_ORDERS,
                        'GET', null, {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    });
                    setOrders(responseData || []);
                } catch (e) {
                    console.log(e);
                    // window.location.reload();
                }
            })()
        }
    }, [])
    console.log(orders);

    return <div className='max-width-900'>
        {!!orders.length && orders.map(i => <h1>Valami jött</h1>)}
    </div>
}