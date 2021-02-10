import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const AboutUs = () => {
    const [mobile, setMobile] = useState('');

    /* watch for screen size and use size appropiate images */
    const resizeWatcher = e => {
        if (e.target.outerWidth > 700) {
            setMobile('')
        } else {
            setMobile('-mobile')
        }
    }
    useEffect(() => {
        window.addEventListener("resize", resizeWatcher);
    })



    return (
        <div className='about'>
            <div className="about__left-side">
                <h2 className="heading-secondary">
                    Ízben gazdag konyha, elérhető áron!
                </h2>


                <h3 className="heading-tertiary">
                    Ímádni fogod az ételeinket!
                    </h3>
                <p className="paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti, unde maiores. Veniam eligendi ad quam commodi et
                    perspiciatis porro. Amet nemo expedita id voluptates in
                    quidem autem doloribus a dolore?
                    </p>
                <h3 className="heading-tertiary">
                    Ílyet máshol nem kapsz!
                    </h3>
                <p className="paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti, unde maiores. Veniam eligendi ad quam commodi et
                    perspiciatis porro. Amet nemo expedita id voluptates in
                    quidem autem doloribus a dolore?
                    </p>
                <Link
                    to='/menu'
                    className="btn-text btn-desktop-view"
                >
                    Nézd meg az étlapunkat &rarr;
                </Link>
            </div>

            <div className="about__right-side">
                <div className="composition">
                    <img className="composition__photo composition composition__photo--p3"
                        src={`/img/food3${mobile}.jpg`} alt='' />
                    <img className="composition__photo composition composition__photo--p1"
                        src={`/img/food1${mobile}.jpg`} alt='' />
                    <img className="composition__photo composition composition__photo--p2"
                        src={`/img/food2${mobile}.jpg`} alt='' />

                </div>
            </div>
            <div className='about__bottom'>
                <Link
                    to='/menu'
                    className="btn-text btn-text--mobile btn-mobile-view"
                >
                    Nézd meg az étlapunkat &rarr;
                </Link>

            </div>

        </div>
    )
}

export default AboutUs;