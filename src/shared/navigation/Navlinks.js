import React from 'react';

import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { AuthButton } from '../../admin/components/AuthModal';

export const Main = (props) => {
    const { isMainPage } = props;

    return (
        <ul className='navigation__list'>
            {isMainPage && <li className='navigation__item'>
                <NavLink to='/menu'>
                    Étlap
                </NavLink>
            </li>}
            {isMainPage && <li className='navigation__item'>
                <NavLink to='/order'>
                    Kiszállítás
                </NavLink>
            </li>}
            {!isMainPage && <li className='navigation__item'>
                <NavLink to='/'>
                    Főoldal
                </NavLink>
            </li>}
            <li className='navigation__item'>
                <Link
                    to='footer'
                    spy={true}
                    smooth={true}
                    duration={500}
                >
                    Kapcsolat
                </Link>
            </li>
            <li className='navigation__item'>
                <Link
                    to='find-us'
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-140}

                >
                    Nyitva tartás
                </Link>
            </li>
            <li className='navigation__item'>
                <Link
                    to='chef'
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-200}
                >
                    Rólunk
                </Link>
            </li>
        </ul >
    )
}

export const Checkout = (props) => {

    return (
        <ul className='navigation__list'>
            <li className='navigation__item'>
                <NavLink to='/order'>
                    Kiszállítás
                </NavLink>
            </li>
            <li className='navigation__item'>
                <NavLink to='/'>
                    Főoldal
                </NavLink>
            </li>
        </ul >
    )
}

export const Menu = () => {
    return (
        <ul className='navigation__list'>
            <li className='navigation__item'>
                <NavLink to='/'>
                    Főoldal
                </NavLink>
            </li>
            <li className='navigation__item'>
                <NavLink to='/order'>
                    Kiszállítás
                </NavLink>
            </li>
            <li className='navigation__item'>
                <Link
                    to='mains'
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={0}
                >
                    Burgerek
                </Link>
            </li>
            <li className='navigation__item'>
                <Link
                    to='drinks'
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={0}
                >
                    Üdítők
                </Link>

            </li>
            <li className='navigation__item'>
                <Link
                    to='tapas'
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={0}
                >
                    Tapas
                </Link>
            </li>
        </ul>
    )
}

export const AdminLinks = () => {
    return (
        <ul className='navigation__list'>
            <li className='navigation__item'>
                <NavLink
                    to='/'
                >
                    Főoldal
                </NavLink>
            </li>
            <li className='navigation__item'>
                <AuthButton />
            </li>
            <li className='navigation__item'>
                <NavLink
                    to='/orders'
                >
                    Rendelések
                </NavLink>
            </li>
        </ul>
    )
}


export const AdminLinksOrder = () => {
    return (
        <ul className='navigation__list'>
            <li className='navigation__item'>
                <NavLink
                    to='/admin'
                >
                    Admin
                </NavLink>
            </li>
            <li className='navigation__item'>
                <AuthButton />
            </li>
            <li className='navigation__item'>
                <NavLink
                    to='/'
                >
                    Főoldal
                </NavLink>
            </li>
        </ul >
    )
}

export const AdminLinksOrderDetails = () => {
    return (
        <ul className='navigation__list'>
            <li className='navigation__item'>
                <NavLink
                    to='/admin'
                >
                    Admin
                </NavLink>
            </li>
            <li className='navigation__item'>
                <NavLink
                    to='/orders'
                >
                    Rendelések
                </NavLink>
            </li>
            <li className='navigation__item'>
                <AuthButton />
            </li>
            <li className='navigation__item'>
                <NavLink
                    to='/'
                >
                    Főoldal
                </NavLink>
            </li>
        </ul >
    )
}

