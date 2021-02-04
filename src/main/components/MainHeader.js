import React from 'react';
import Navbar from '../../shared/navigation/Navbar';
import CTAButton from './CTAButton';


const MainHeader = () => {


    return (
        <header className='header'>
                
            <div className='header__name'>
                <h1>
                    <span className='header__name--1'>
                        Martinez Taco-Burrito
                    </span>
                    <span className='header__name--2'>
                        Bistro Étterem
                    </span>
                </h1>
            </div>
            <CTAButton />
        </header>
    )
}

export default MainHeader;