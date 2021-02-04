import React from 'react';

import { ArrowDown } from '../../SVG/Icons'

const CTAButton = () => {

//we have the border as a child so the transform won't affect the button element

    return (

        <button className='cta-btn'>
            <ArrowDown />
            <div className='cta-border'></div>
        </button>


    )
}

export default CTAButton;