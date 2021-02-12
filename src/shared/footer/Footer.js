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

    //  <Map className='map__footer' />
    return (
        <div className='footer'>
            <div className='footer__left'>

                <div className='map map__footer'>
                    <a
                        target='_blanc'
                        href='https://www.google.com/maps/place/El+poco+loco/@46.506658,18.4116852,15z/data=!4m5!3m4!1s0x0:0x253f81b5695e6d50!8m2!3d46.506658!4d18.4116852'
                        >
                        <img src='/img/map.jpg' alt='map' className='map-img' />
                    </a>
                </div>
            </div>
            <div className='footer__right'>
                <div className='social-icons'>
                    <Facebook link='El-PoCo-LoCo-Mexicoi-Bistro-2878400305509882' />
                    <Tripadvisor link='' />
                    <Instagram link='' />
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