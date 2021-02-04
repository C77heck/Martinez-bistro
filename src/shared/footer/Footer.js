import React from 'react';

import { Link } from 'react-router-dom';

import {
    Facebook,
    Instagram,
    Tripadvisor,
    Email,
    Home
} from '../../SVG/Icons';


import Map from '../UIElements/Map';


const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer__left'>
                <Map className='map__footer' />
            </div>
            <div className='footer__right'>
                <div className='social-icons'>
                    <Facebook />
                    <Tripadvisor />
                    <Instagram />
                </div>

                <ul className='footer__list'>
                    <li className='footer__list__items' ><Home /> Hőgyész, Ady Endre u. 16, 7191</li>
                    <li className='footer__list__items' ><Email />EMAIL@EMAIL.COM</li>
                    <li className='footer__list__items' >Copyright &copy; by El Poco Loco</li>
                </ul>
            </div>
        </div>
    )
}



export default Footer;