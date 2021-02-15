import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import { objectSorting } from '../../utility/objectSorting';
import { addId } from '../../utility/addId';

const Layout = props => {
    const { location } = useHistory();
    const { sendRequest, isLoading } = useHttpClient();
    const [mains, setMains] = useState({
        burgers: [],
        platillos: [],
        mexicanos: [],
        double: [],
        nachos: [],
        arroz: [],
        dippers: [],
        desserts: [],
        extras: [],
        drinks: []
    })

    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_MENU);
                //adding special id so we can match item up to the targeted element
                const addedSpecialId = addId(responseData.menu);
                //we sort items dynamically into different arrays based on type
                setMains(objectSorting(addedSpecialId));
                //we then save it into the local storage so we can iterate from there.
                localStorage.setItem('menu', JSON.stringify(addedSpecialId));
            } catch (err) {

            }
        })()
    }, [])


    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='layout'>
                <div id='mains' className='layout__item'>
                    <h2 className='heading-secondary'>
                        Burgerek
                </h2>
                    <h4 className='heading-fourth'> </h4>

                    {mains.burgers && mains.burgers.map(i => {
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
                    {mains.platillos && mains.platillos.map(i => {
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

                    {mains.mexicanos && mains.mexicanos.map(i => {
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

                    {mains.nachos && mains.nachos.map(i => {
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
                    {mains.arroz && mains.arroz.map(i => {
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
                    {mains.dippers && mains.dippers.map(i => {
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
                    {mains.double && mains.double.map(i => {
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
                    {mains.desserts && mains.desserts.map(i => {
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

                    {mains.extras && mains.extras.map(i => {
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
                    {mains.drinks && mains.drinks.map(i => {
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

