import React, { useState, useEffect, useContext } from 'react';
import { ExpiryContext } from '../../shared/context/expiry-context';
import { useHttpClient } from '../../shared/hooks/http-hook';



const Testimonial = () => {
    const { testimonialExpiry } = useContext(ExpiryContext);
    const [mobile, setMobile] = useState('');
    const [testimonial, setTestimonial] = useState({
        quote: 'A főzés is művészet',
        text: ''
    })
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
    useEffect(() => {
        const storedData = [JSON.parse(localStorage.getItem('testimonial'))];
        if (storedData[0] !== null && !testimonialExpiry) {
            setTestimonial(storedData[0]);
        } else {
            (async () => {
                try {
                    const responseData = await sendRequest(process.env.REACT_APP_QUOTE)
                    setTestimonial({
                        quote: responseData.testimonial.quote,
                        text: responseData.testimonial.text
                    })
                    localStorage.setItem('testimonial', JSON.stringify(responseData.testimonial));
                } catch (err) {

                }

            })()
        }

    }, [testimonialExpiry])

    return (
        <div className='testimonial'>
            <div className='testimonial__left'>
                <h2 className='heading-secondary'>"{testimonial.quote}"</h2>
                <h4 className='heading-italic'>Christian Martinez Séf</h4>
                <p className='paragraph paragraph--testimonial'>{testimonial.text.length > 0 ? testimonial.text :
                    ' egyedi, vendégeink által sokat dicsért ízvilágával igyekszik a gasztronómia szerelmeseinek kedvében járni.Éttermünkben igyekszünk ' +
                    'helyi alapanyagokból, a környékre jellemző ízekkel megismertetni vendégeinket. Büszkék vagyunk arra, hogy konyhánkon a helyben terítékre ' +
                    'hozott vadból frissen, sousvideált és smooker BBQ ételek készülnek. Szezonálisan igyekszünk bemutatni a tájegység ízeit. Leveseket, főételeket' +
                    'és helyben készült desszertek formájában.Ételeink elkészítése során igyekszünk kiszolgálni az egyedi igényeket, elővarázsoljuk különböző nemzetek' +
                    'konyháinak ízeit figyelembe véve vendégeink esetleges étel érzékenységeit is.'}</p>

            </div>

            <div className='testimonial__right'>
                <div className='image-container'>
                    <img src={`/img/chef${mobile}.jpg`} alt='Christian Martinez' className='chef-image' />
                </div>


            </div>
        </div>
    )
}



export default Testimonial;