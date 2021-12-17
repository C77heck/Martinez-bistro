import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import AuthModal, { AuthButton } from '../../admin/components/AuthModal';
import { redirect } from '../../utility/helpers';
import { AuthContext } from '../context/auth-context';
import { Storage } from '../helpers/storage';
import { useHttpClient } from '../hooks/http-hook';

export const Main = (props) => {
    const { isMainPage } = props;

    return (
        <ul className='navigation__list'>
            {isMainPage && <li className='navigation__item'>
                <NavLink to='/menu'>
                    Étlap
                </NavLink>
            </li>}
            {isMainPage && <OrderNavLink />
            }
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
            <OrderNavLink />
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
            <OrderNavLink />
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
                <AdminNavLink />
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
                <AdminNavLink />
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

const AdminNavLink = props => {
    const { isLoggedIn } = useContext(AuthContext);

    return <AuthModal onSuccess={() => redirect('/orders')}>
        {!isLoggedIn
            ? <a href='#' id='auth-btn' >Rendelések</a>
            : <NavLink to='/orders' >Rendelések</NavLink>}
    </AuthModal>;
}

const OrderNavLink = props => {
    const { sendRequest, error } = useHttpClient();
    const storage = new Storage('uniqueOrderId');
    let tries = 0;
    const getUniqueOrderId = async () => {
        try {
            const uniqueId = await sendRequest(process.env.REACT_APP_GET_UNIQUE_ORDER_ID)
            if (!uniqueId) {
                throw new Error();
            }
            storage.set(uniqueId);
            redirect('/order');
        } catch (e) {
            if (tries < 3) {
                await getUniqueOrderId();
                tries += 1;
            }
            console.log(e);
        }
    }


    return <li className='navigation__item'>
        <a onClick={getUniqueOrderId}>
            Rendelés
            </a>
    </li >
}