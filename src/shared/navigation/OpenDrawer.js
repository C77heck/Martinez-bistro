import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';


import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import NavLinks from './Navlinks';
import { useHistory } from 'react-router-dom';


const SideDrawer = props => {


    const content = (<CSSTransition
        in={props.show}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
    >
        {<aside className="side-drawer" onClick={props.onClick}>
            {props.children}
        </aside>}
    </CSSTransition>)

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))

}


const OpenDrawer = () => {

    const [show, setShow] = useState(false)
    const { location } = useHistory()
    const onClickHandler = () => {
        console.log('triggered')
        setShow(false)
    }


    return (
        <React.Fragment>
            <SideDrawer show={show} onClick={onClickHandler}>
                <ul className='navigation__list'>
                    {location.pathname === '/' ? <React.Fragment>
                        <li className='navigation__item'>
                            <Link
                                to='/menu'
                            >
                                Étlapunkat
                                </Link>
                        </li>
                        <li className='navigation__item'>
                            <a href='#footer'>
                                Kapcsolat
                </a>
                        </li>
                        <li className='navigation__item'>
                            <a href='#find-us'>
                                Nyitva tartás
                </a>
                        </li>
                        <li className='navigation__item'>
                            <a href='#chef'>
                                Rólunk
                </a>
                        </li>
                    </React.Fragment>

                        :

                        <React.Fragment>
                            <li className='navigation__item'>
                                <Link
                                    to='/'
                                >
                                    Főoldal
                                </Link>
                            </li>
                            <li className='navigation__item'>
                                <a href='#mains'>
                                    Burgerek
                </a>
                            </li>
                            <li className='navigation__item'>
                                <a href='#drinks'>
                                    Üdítők
                </a>
                            </li>
                            <li className='navigation__item'>
                                <a href='#tapas'>
                                    Tapas
                </a>
                            </li>
                        </React.Fragment>}
                </ul>

            </SideDrawer>
            <button
                className='drawer'
                onClick={() => { setShow(true) }}
            >
                <span className='drawer__icon'>&nbsp;</span>
            </button>
        </React.Fragment >
    )
}

export default OpenDrawer;

//<NavLinks />