import React, { useContext, useState } from 'react';

import { Link } from 'react-router-dom';


import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import { AuthButton } from '../../admin/components/AuthModal';
import { AuthContext } from '../context/auth-context';


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

    const locations = () => {
        if (location.pathname === '/') {
            return (<React.Fragment>
                <li className='navigation__item'>
                    <Link
                        to='/menu'
                    >
                        Étlapunkat
                </Link>
                </li>
                <li className='navigation__item'>
                    <a href='#footer'>Kapcsolat</a>
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
                    <Link
                        to='/'
                    >
                        Főoldal
                </Link>
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
                    <Link
                        to='/'
                    >
                        Főoldal
                </Link>
                </li>
                <li className='navigation__item'>
                    <AuthButton />
                </li>

            </React.Fragment>)
        }

    }
    return (
        <React.Fragment>
            <SideDrawer show={show} onClick={!drawer ? onClickHandler : undefined}>
                <ul
                    id='navigation-items'
                    className='navigation__list'>
                    {locations()}
                </ul>

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