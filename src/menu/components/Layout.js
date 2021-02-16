import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import { addId } from '../../utility/addId';
import { MenuContext } from '../../shared/context/menu-context';

const Layout = props => {
    const { types, menu, count, clearCount, saveMenu } = useContext(MenuContext);
    const { location } = useHistory();
    const { sendRequest, isLoading } = useHttpClient();
    useEffect(() => {
        if (menu.length > 0) {// to map items when the admin changes things like type
            saveMenu(menu)
        } else {
            (async () => {
                try {
                    const responseData = await sendRequest(process.env.REACT_APP_MENU);
                    //adding special id so we can match item up to the targeted element
                    const addedSpecialId = addId(responseData.menu);
                    // then we process it in menu context with a hook function. see menu-hook for logic
                    saveMenu(addedSpecialId);
                } catch (err) {
                }
            })()
        }

    }, [saveMenu, menu])


    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='layout'>
                <div id='mains' className='layout__item'>
                    <h2 className='heading-secondary'>
                        Burgerek
                </h2>
                    <h4 className='heading-fourth'> </h4>

                    {types.burgers && types.burgers.map(i => {
                        return (
                            <div
                                key={i.id}
                                onClick={props.onClick}
                                className={location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}
                            >
                                <div className='food-item'>
                                    <p className='paragraph paragraph--menu'>{i.name}</p>
                                    <p className='paragraph paragraph--menu'>{i.price}</p>
                                    <div
                                        id={location.pathname === '/admin/menu' ? i.identifier : null}
                                        className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                    >   </div>
                                </div>
                                <p>{i.description}</p>

                            </div>
                        )
                    })}
                </div>

                <div className='layout__item'>
                    <h2 className='heading-secondary'>
                        Platillos tex-mex
                </h2>
                    {types.platillos && types.platillos.map(i => {
                        return (
                            <div
                                key={i.id}
                                className={` ${location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}`}
                                onClick={props.onClick}
                            >
                                <div className='food-item'>
                                    <p className='paragraph paragraph--menu'>{i.name}</p>
                                    <p className='paragraph paragraph--menu'>{i.price}</p>
                                    <div
                                        id={location.pathname === '/admin/menu' ? i.identifier : null}
                                        className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                    >   </div>
                                </div>
                                <p>{i.description}</p>
                            </div>
                        )
                    })}
                </div>


                <div className='layout__item'>
                    <h2 className='heading-secondary'>
                        Platillos Mexicanos
                </h2>

                    {types.mexicanos && types.mexicanos.map(i => {
                        return (
                            <div
                                key={i.id}
                                className={`${location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}`}
                                onClick={props.onClick}
                            >
                                <div className='food-item'>
                                    <p className='paragraph paragraph--menu'>{i.name}</p>
                                    <p className='paragraph paragraph--menu'>{i.price}</p>
                                    <div
                                        id={location.pathname === '/admin/menu' ? i.identifier : null}
                                        className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                    >   </div>
                                </div>
                                <p>{i.description}</p>
                            </div>
                        )
                    })}

                </div>

                <div id='tapas' className='layout__item'>
                    <h2 className='heading-secondary'>
                        Tapas
                </h2>
                    <h4 className='heading-fourth'>Nachos</h4>

                    {types.nachos && types.nachos.map(i => {
                        return (
                            <div
                                key={i.id}
                                className={`${location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}`}
                                onClick={props.onClick}
                            >
                                <div className='food-item'>
                                    <p className='paragraph paragraph--menu'>{i.name}</p>
                                    <p className='paragraph paragraph--menu'>{i.price}</p>
                                    <div
                                        id={location.pathname === '/admin/menu' ? i.identifier : null}
                                        className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                    >   </div>
                                </div>
                            </div>
                        )
                    })}


                    <h4 className='heading-fourth'>Arroz empanizado</h4>
                    {types.arroz && types.arroz.map(i => {
                        return (
                            <div
                                key={i.id}
                                className={`${location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}`}
                                onClick={props.onClick}
                            >
                                <div className='food-item'>
                                    <p className='paragraph paragraph--menu'>{i.name}</p>
                                    <p className='paragraph paragraph--menu'>{i.price}</p>
                                    <div
                                        id={location.pathname === '/admin/menu' ? i.identifier : null}
                                        className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                    >   </div>
                                </div>
                            </div>
                        )
                    })}

                    <h4 className='heading-fourth'>Dippers</h4>
                    {types.dippers && types.dippers.map(i => {
                        return (
                            <div
                                key={i.id}
                                className={`food-item ${location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}`}
                                onClick={props.onClick}
                            >
                                <p className='paragraph paragraph--menu'>{i.name}</p>
                                <p className='paragraph paragraph--menu'>{i.price}</p>
                                <div
                                    id={location.pathname === '/admin/menu' ? i.identifier : null}
                                    className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                >   </div>
                            </div>
                        )
                    })}
                </div>


                <div className='layout__item'>
                    <h2 className='heading-secondary'>
                        PoCo LoCo két személyes tál
                </h2>
                    {types.double && types.double.map(i => {
                        return (
                            <div
                                key={i.id}
                                className={`${location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}`}
                                onClick={props.onClick}
                            >
                                <div className='food-item'>
                                    <p className='paragraph paragraph--menu'>{i.name}</p>
                                    <p className='paragraph paragraph--menu'>{i.price}</p>
                                    <div
                                        id={location.pathname === '/admin/menu' ? i.identifier : null}
                                        className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                    >   </div>
                                </div>
                                <p>{i.description}</p>
                            </div>
                        )
                    })}

                </div>

                <div className='layout__item'>
                    <h4 className='heading-fourth'>Desszert</h4>
                    {types.desserts && types.desserts.map(i => {
                        return (
                            <div
                                key={i.id}
                                className={` ${location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}`}
                                onClick={props.onClick}
                            >
                                <div className='food-item'>
                                    <p className='paragraph paragraph--menu'>{i.name}</p>
                                    <p className='paragraph paragraph--menu'>{i.price}</p>
                                    <div
                                        id={location.pathname === '/admin/menu' ? i.identifier : null}
                                        className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                    >   </div>
                                </div>
                                <p>{i.description}</p>
                            </div>
                        )
                    })}
                </div>


                <div className='layout__item'>
                    <h2 className='heading-secondary'>
                        Extrák
                </h2>

                    {types.extras && types.extras.map(i => {
                        return (
                            <div
                                className={`food-item ${location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}`}
                                key={i.id}
                                onClick={props.onClick}
                            >
                                <p className='paragraph paragraph--menu'>{i.name}</p>
                                <p className='paragraph paragraph--menu'>{i.price}</p>
                                <div
                                    id={location.pathname === '/admin/menu' ? i.identifier : null}
                                    className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                >   </div>
                            </div>
                        )
                    })}

                </div>

                <div id='drinks' className='layout__item'>
                    <h2 className='heading-secondary'>
                        Üdítők
                </h2>
                    {types.drinks && types.drinks.map(i => {
                        return (
                            <div
                                key={i.id}
                                className={`food-item ${location.pathname === '/admin/menu' ? 'menu-item-wrapper' : null}`}
                                onClick={props.onClick}
                            >
                                <p className='paragraph paragraph--menu'>{i.name}</p>
                                <p className='paragraph paragraph--menu'>{i.price}</p>
                                <div
                                    id={location.pathname === '/admin/menu' ? i.identifier : null}
                                    className={location.pathname === '/admin/menu' ? 'menu-admin-view' : null}
                                >   </div>
                            </div>
                        )
                    })}

                </div>

            </div>
        </React.Fragment>

    )
}

export default Layout;

