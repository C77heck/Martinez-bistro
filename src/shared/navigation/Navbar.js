import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

import { AdminLinks, AdminLinksOrder, AdminLinksOrderDetails, Checkout, Main, Menu, OrderNavLinks } from './Navlinks';

const Navbar = props => {

    const { isLoggedIn } = useContext(AuthContext);

    const { location } = useHistory();

    const [isScrolled, setIsScrolled] = useState(false)



    /*  we are changing the navbar styling when the user scrolled 
     down and reverse it when the user comes all the way back to the top */
    useEffect(() => {
        const displayButton = () => {
            if (window.scrollY < 100) {
                setIsScrolled(false)
            } else {
                setIsScrolled(true)
            }
        }
        window.addEventListener('scroll', displayButton)

    }, [])

    const locations = () => {
        if (location.pathname === '/') {
            return <Main isMainPage={true} />
        } else if (location.pathname === '/menu') {
            return <Menu />
        } else if (location.pathname.match('/admin')) {
            return <AdminLinks />
        } else if (location.pathname === '/order') {
            return <OrderNavLinks />
        } else if (location.pathname === '/checkout') {
            return <Checkout />
        } else if (location.pathname === '/orders') {
            return <AdminLinksOrder />
        } else if (location.pathname.match('/order-details')) {
            return <AdminLinksOrderDetails />
        }
    }

    return (
        <div
            className={`${isScrolled ? 'navigation--scrolled' : ''} 
        ${props.className} navigation ${isLoggedIn && getNavBarColor(location.pathname) && 'navigation--loggedin'}`}>
            <nav className='navigation__content'>
                {locations()}
            </nav>
        </div>
    )
}

const getNavBarColor = (pathname) => {
    if (pathname.match('admin') || pathname.match('orders') || pathname.match('order-details')) {
        return true;
    }
    return false;
}


export default Navbar;