import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-scroll'

import { Main, Menu } from './Navlinks';


const Navbar = props => {

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


    return (
        <div
            className={`${isScrolled ? 'navigation--scrolled' : ''} 
        ${props.className} navigation`}>
            <nav className='navigation__content'>
                {location.pathname === '/' ? <Main /> : <Menu />}
            </nav>
        </div>
    )
}


export default Navbar;