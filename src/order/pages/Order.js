import React, { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import { addId } from '../../utility/addId';
import { MenuContext } from '../../shared/context/menu-context';
import { ExpiryContext } from '../../shared/context/expiry-context';
import { ItemCard } from "../components/ItemCard";
import { OrderDetails } from "../components/OrderDetails";
import { FilterLine } from "../components/Filter";
import { foodTypes } from "../../admin/pages/EditMenu";

export const Order = props => {
    const { menu, saveMenu, orderableList } = useContext(MenuContext);
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

    const itemsToMap = !orderableList.length ? menu : orderableList;

    return <div className='full-screen m-3 mt-14 display-flex align-items-center flex-column'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h1 className='fs-34 pb-2'>Étel Rendelés</h1>

        <FilterLine filters={foodTypes} />

        <div className='grid-width display-flex'>
            <div className='fix-width-200' />
            <div>
                <div className='fix-width-600'>
                    {itemsToMap.map(m => <ItemCard
                        isCheckout={false}
                        key={m._id}
                        menuItem={m}
                    />)}
                </div>
            </div>
            <div className='min-width-400 display-flex justify-content-center'>
                <OrderDetails />
            </div>
        </div>
    </div>;
}
