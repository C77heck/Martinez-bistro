import React, { useEffect, useRef } from 'react';
import Footer from '../../shared/footer/Footer';
import AboutUs from '../components/AboutUs';

import FindUs from '../components/FindUs';
import MainHeader from '../components/MainHeader';
import Testimonial from '../components/Testimonial';

const LandingPage = () => {
    /*     const ref = useRef();
    
        useEffect(() => {
    
            ref.current.scrollIntoView();
    
        })
     */
    return (
        <React.Fragment>

            <MainHeader />
            <section id='about-us'>
                <AboutUs />
            </section>
            <section id='find-us'>
                <FindUs />
            </section>
            <section id='chef'>
                <Testimonial />
            </section>
            <section id='instagram'>
                <div class="elfsight-app-fadd920a-df2b-4646-b538-c1853e3f5f1f"></div>
            </section>
            <section id='footer'>
                <Footer />
            </section>


        </React.Fragment>

    )
}


export default LandingPage;