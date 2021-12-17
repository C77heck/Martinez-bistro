import React, { useContext, useState } from 'react';

import { Link } from 'react-router-dom';


import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import { AuthButton } from '../../admin/components/AuthModal';
import { AuthContext } from '../context/auth-context';
import { AdminLinks, AdminLinksOrder, AdminLinksOrderDetails, Checkout, Main, Menu } from './Navlinks';


const SideDrawer = props => {

    const { isLoggedIn } = useContext(AuthContext);
    const content = (<CSSTransition
        in={props.show}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
    >
        {<aside
            name='name'
            id='aside'
            className={`side-drawer ${isLoggedIn && 'side-drawer__logged-out'}`}
            onClick={props.onClick}>
            {props.children}
        </aside>}
    </CSSTransition>)

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))

}


const OpenDrawer = () => {
    const { drawer } = useContext(AuthContext);
    const [show, setShow] = useState(false)
    const { location } = useHistory()
    const onClickHandler = e => {
        if (e.target.id === 'auth-btn' || e.target.id === 'backdrop') {
            //to prevent the sidedrawer from closing when clicking on login button
        } else {
            setShow(false)
        }
    }

    const locationssd = () => {
        if (location.pathname === '/') {
            return (<React.Fragment>
                <li className='navigation__item'>
                    <Link to='/menu'>Étlapunk</Link>
                </li>
                <li className='navigation__item'>
                    <a href='#footer'>Kapcsolat</a>
                </li>
                <li className='navigation__item'>
                    <Link to='/order'>Rendelés</Link>
                </li>
                <li className='navigation__item'>
                    <a href='#find-us'>Nyitva tartás</a>
                </li>
                <li className='navigation__item'>
                    <a href='#chef'>Rólunk</a>
                </li>
            </React.Fragment>)
        } else if (location.pathname === '/menu') {
            return (<React.Fragment>
                <li className='navigation__item'>
                    <Link to='/'>Főoldal</Link>
                </li>
                <li className='navigation__item'>
                    <a href='#mains'>Burgerek</a>
                </li>
                <li className='navigation__item'>
                    <a href='#drinks'>Üdítők</a>
                </li>
                <li className='navigation__item'>
                    <a href='#tapas'>Tapas</a>
                </li>
            </React.Fragment>)
        } else if (location.pathname.match('/admin')) {
            return (<React.Fragment>

                <li className='navigation__item'>
                    <Link
                        to='/admin'
                    >
                        Admin
                </Link>                </li>
                <li className='navigation__item'>
                    <Link to='/'>Főoldal </Link>
                </li>
                <li className='navigation__item'>
                    <AuthButton />
                </li>

            </React.Fragment>)
        }

    }

    const closeDrawer = () => {
        console.log('got clicked');
        setShow(false)
    };

    // TODO -> Sort out the styling of these on mobile so no need for a different way to display it.
    const locations = () => {
        if (location.pathname === '/') {
            return <Main isMainPage={true} />
        } else if (location.pathname === '/menu') {
            return <div
                onClick={closeDrawer}
                className={'w-100 position-center'}
            ><Menu /></div>
        } else if (location.pathname.match('/admin')) {
            return <AdminLinks />
        } else if (location.pathname === '/order') {
            return <Main isMainPage={false} />
        } else if (location.pathname === '/checkout') {
            return <Checkout />
        } else if (location.pathname === '/orders') {
            return <AdminLinksOrder />
        } else if (location.pathname.match('/order-details')) {
            return <AdminLinksOrderDetails />
        }
    }

    return (
        <React.Fragment>
            <SideDrawer show={show} onClick={!drawer ? onClickHandler : undefined}>
                {locations()}
            </SideDrawer>
            <button
                className='drawer'
                onClick={() => { setShow(true) }}
            >
                <span className='drawer__icon'>&nbsp;</span>
            </button>
        </React.Fragment>
    )
}

export default OpenDrawer;

//<NavLinks />