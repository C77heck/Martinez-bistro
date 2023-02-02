import React, { useContext, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import AuthModal, { AuthButton } from '../../admin/components/AuthModal';
import { redirect } from '../../utility/helpers';
import { AuthContext } from '../context/auth-context';
import { Storage } from '../../utility/StorageHelper';
import { useHttpClient } from '../hooks/http-hook';
import MessageModal from '../UIElements/MessageModal';

export const OrderNavLinks = props => {
    return (
        <ul className='navigation__list'>
            <li className='navigation__item'>
                <NavLink to='/'>
                    Főoldal
                </NavLink>
            </li>
            <li className='navigation__item'>
                <NavLink to='/menu'>
                    Étlap
                </NavLink>
            </li>
        </ul >
    )
}
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

export const AdminLinks = props => {
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
                <AuthButton backdropClasses={props.backdropClasses} />
            </li>
            <li className='navigation__item'>
                <AdminNavLink backdropClasses={props.backdropClasses} />
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

    return <AuthModal
        onSuccess={() => redirect('/orders')}
        backdropClasses={props.backdropClasses}
    >
        {!isLoggedIn
            ? <a href='#' id='auth-btn' >Rendelések</a>
            : <NavLink to='/orders' >Rendelések</NavLink>}
    </AuthModal>;
}

const OrderNavLink = props => {
    const [message, setMessage] = useState('');
    const { sendRequest, error } = useHttpClient();
    const storage = new Storage('uniqueOrderId');
    const isRestaurantClosed = getIsRestuarantClosed();
    let tries = 0;
    const getUniqueOrderId = async () => {
        if (isRestaurantClosed) {
            setMessage('Sajnáljuk, de ma zárva vagyunk.');
        } else {
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
    }

    return <React.Fragment>
        <MessageModal
            onClear={() => { setMessage('') }}
            message={message}
            className='admin-message-modal'
            backdropClasses={'z-300'}
        />
        <li className='navigation__item'><a id='order' onClick={getUniqueOrderId}>Rendelés</a></li>
    </React.Fragment>
}

export const getIsRestuarantClosed = () => {
    return false;
    const date = new Date();
    const day = date.getDay();

    return day === 0 || day === 1;
}