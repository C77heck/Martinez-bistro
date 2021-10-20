import React from 'react';

import { Link } from 'react-scroll';

import { ArrowDown } from '../../SVG/Icons'

const CTAButton = () => {

    //we have the border as a child so the transform won't affect the button element

    return (

        <button className='cta-btn'>
            <Link
                to='find-us'
                spy={true}
                smooth={true}
                duration={500}
                offset={-140}
            >
                <ArrowDown />

                <div className='cta-border'></div>
            </Link>
        </button>


    )
}

export default CTAButton;