import React, { useEffect, useRef } from 'react';

import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

export const Main = () => {

    return (
        <ul className='navigation__list'>
            <li className='navigation__item'>
                <NavLink
                    to='/menu'
                >
                    Étlapunk
                </NavLink>
            </li>
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
        </ul>
    )
}

export const Menu = () => {
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
