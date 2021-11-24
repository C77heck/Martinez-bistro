import React, { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import { addId } from '../../utility/addId';
import { MenuContext } from '../../shared/context/menu-context';
import { ExpiryContext } from '../../shared/context/expiry-context';
import { ItemCard } from "../components/ItemCard";
import { OrderDetails } from "../components/OrderDetails";

export const Order = props => {
    const { types, menu, saveMenu } = useContext(MenuContext);
    const { location } = useHistory();
    const { sendRequest, isLoading } = useHttpClient();
    const { menuExpiry } = useContext(ExpiryContext);

    useEffect(() => {
        const storedMenu = JSON.parse(localStorage.getItem('menu')) || [];
        if (menu.length > 0) {// to map items when the admin changes things like type
            saveMenu(menu)
        } else if (storedMenu.length > 0 && !menuExpiry) {
            saveMenu(storedMenu)
        } else {
            (async () => {
                try {
                    const responseData = await sendRequest(process.env.REACT_APP_MENU);
                    //adding special id so we can match item up to the targeted element
                    const addedSpecialId = addId(responseData.menu);
                    // then we process it in menu context with a hook function. see menu-hook for logic
                    saveMenu(addedSpecialId);
                } catch (err) {
                    console.log(err)
                }
            })()
        }

    }, [saveMenu, menu, menuExpiry])

    return <div className='full-screen m-3 mt-14 position-center'>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className='grid-width display-flex'>
            <div className='max-width-200' />
            <div>
                <h1 className='fs-28'>Étel Rendelés</h1>
                <div className='max-width-600'>
                    {menu.map(m => <ItemCard menuItem={m} />)}
                </div>
            </div>
            <div className='min-width-400 display-flex justify-content-center'>
                <OrderDetails />
            </div>
        </div>
    </div>;
}
