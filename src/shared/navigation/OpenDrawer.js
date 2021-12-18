import React, { useContext, useEffect, useState } from 'react';

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
        // to prevent the sidedrawer from closing when clicking on login button
        if (e.target.id === 'auth-btn' || e.target.id === 'backdrop') {
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        const menuWrapper = document.querySelector('.MobileNavBarWrapper');
        if (show) {
            !!menuWrapper && menuWrapper.addEventListener('click', closeDrawer);
        } else {
            !!menuWrapper && menuWrapper.removeEventListener('click', closeDrawer);
        }
    }, [show]);

    const closeDrawer = () => {
        setShow(false)
    };

    // TODO -> Sort out the styling of these on mobile so no need for a different way to display it.
    const locations = () => {
        if (location.pathname === '/') {
            return <div
                onClick={closeDrawer}
                className={'w-100 position-center MobileNavBarWrapper'}
            ><Main isMainPage={true} /></div>
        } else if (location.pathname === '/menu') {
            return <div
                onClick={closeDrawer}
                className={'w-100 position-center MobileNavBarWrapper'}
            ><Menu /></div>
        } else if (location.pathname.match('/admin')) {
            return <AdminLinks backdropClasses={'z-300'} />
        } else if (location.pathname === '/order') {
            return <div
                onClick={closeDrawer}
                className={'w-100 position-center MobileNavBarWrapper'}
            ><Main isMainPage={false} /></div>
        } else if (location.pathname === '/checkout') {
            return <div
                onClick={closeDrawer}
                className={'w-100 position-center MobileNavBarWrapper'}
            ><Checkout /></div>
        } else if (location.pathname === '/orders') {
            return <div
                onClick={closeDrawer}
                className={'w-100 position-center MobileNavBarWrapper'}
            ><AdminLinksOrder /></div>
        } else if (location.pathname.match('/order-details')) {
            return <div
                onClick={closeDrawer}
                className={'w-100 position-center MobileNavBarWrapper'}
            ><AdminLinksOrderDetails /></div>
        }
    }

    return (
        <React.Fragment>
            <SideDrawer show={show} onClick={!drawer ? onClickHandler : undefined}>
                {locations()}
            </SideDrawer>
            <button
                className='drawer'
                onClick={() => setShow(!show)}
            >
                <span className='drawer__icon'>&nbsp;</span>
            </button>
        </React.Fragment>
    )
}

export default OpenDrawer;

