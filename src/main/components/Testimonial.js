import React, { useState, useEffect } from 'react';



const Testimonial = () => {
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
        <div className='testimonial'>
            <div className='testimonial__left'>
                <h2 className='heading-secondary'>"A főzés is művészet"</h2>
                <h4 className='heading-italic'>Christian Martinez Séf</h4>
                <p className='paragraph paragraph--testimonial'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem porro veritatis dignissimos amet ex, consequuntur eum harum nemo.
                    Nemo odit eveniet officia deleniti exercitationem quidem accusamus sit nostrum
                    aliquam neque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem porro veritatis dignissimos amet ex, consequuntur eum harum nemo.
                    Nemo odit eveniet officia deleniti exercitationem quidem accusamus sit nostrum
                    aliquam neque.Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem porro veritatis dignissimos amet ex, consequuntur eum harum nemo.
                    Nemo odit eveniet officia deleniti exercitationem quidem accusamus sit nostrum
                    aliquam neque.
</p>
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