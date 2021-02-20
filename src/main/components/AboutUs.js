import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { ExpiryContext } from '../../shared/context/expiry-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const AboutUs = () => {
    const { storyExpiry } = useContext(ExpiryContext);

    const [mobile, setMobile] = useState('');
    const [stories, setStories] = useState({
        firsth2: '',
        firsth3: '',
        firstp: '',
        secondh2: '',
        secondp: ''
    });
    const { sendRequest } = useHttpClient()
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

    // setting the story either from local storage or fetching it.
    useEffect(() => {
        const storedStories = JSON.parse(localStorage.getItem('stories')) || [];

        if (storedStories.length > 0 && !storyExpiry) {
            setStories(storedStories);
        } else {
            (async () => {
                try {
                    const responseData = await sendRequest(process.env.REACT_APP_STORIES);
                    setStories(responseData.story)
                    localStorage.setItem('stories', JSON.stringify(responseData.story));
                } catch (err) {

                }
            })()
        }

    }, [])



    return (
        <div className='about'>
            <div className="about__left-side">
                <h2 className="heading-secondary">
                    {stories.firsth2}
                </h2>


                <h3 className="heading-tertiary">
                    {stories.firsth3}
                </h3>
                <p className="paragraph">
                    {stories.firstp}
                </p>
                <h3 className="heading-tertiary">
                    {stories.secondh2}
                </h3>
                <p className="paragraph">
                    {stories.secondp}
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