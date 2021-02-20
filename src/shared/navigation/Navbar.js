import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-scroll'
import { AuthContext } from '../context/auth-context';

import { AdminLinks, Main, Menu } from './Navlinks';


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
            return <Main />
        } else if (location.pathname === '/menu') {
            return <Menu />
        } else if (location.pathname.match('/admin')) {
            return <AdminLinks />
        }
    }
    return (
        <div
            className={`${isScrolled ? 'navigation--scrolled' : ''} 
        ${props.className} navigation ${isLoggedIn && location.pathname.match('admin') && 'navigation--loggedin'}`}>
            <nav className='navigation__content'>
                {locations()}
            </nav>
        </div>
    )
}


export default Navbar;