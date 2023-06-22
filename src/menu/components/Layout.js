import React, {useContext, useEffect} from 'react';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import {addId} from '../../utility/addId';
import {MenuContext} from '../../shared/context/menu-context';
import {ExpiryContext} from '../../shared/context/expiry-context';
import {foodTypes} from '../../admin/pages/EditMenu';
import {FoodItem} from './FoodItem';
import {useHttpClient} from "../../shared/hooks/http-hook";

export const objectToArray = (object, foodTypes) => {
    const array = [];
    for (const prop in object) {
        const type = foodTypes.filter(type => type.english === prop)[0];
        array.push({id: type?.id || 30, title: type?.value || '', types: object[prop]});
    }

    return array.sort((a, b) => a.id - b.id);
}

const Layout = props => {
    const {types, menu, saveMenu} = useContext(MenuContext);
    const {sendRequest, isLoading} = useHttpClient();

    const {menuExpiry} = useContext(ExpiryContext);

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
                    // adding special id so we can match item up to the targeted element
                    const addedSpecialId = addId(responseData.menu);
                    // then we process it in menu context with a hook function. see menu-hook for logic
                    saveMenu(addedSpecialId);
                } catch (err) {
                    console.log(err)
                }
            })()
        }

    }, [saveMenu, menu, menuExpiry])
    const menuTypes = objectToArray(types, foodTypes);

    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay/>}
            <div className='layout'>
                {menuTypes.map(item => <FoodItem title={item.title} types={item.types} onClick={props.onClick}/>)}
            </div>
        </React.Fragment>

    )
}

export default Layout;
