import React from 'react';

import Map from '../../shared/UIElements/Map';


const FindUs = () => {


    return (
        <div className='find-us'>
            <div className='find-us__left'>
                <Map className='map__landing-page' />
            </div>

            <div className='find-us__right'>
                <h2 className='heading-secondary white-text '>
                    Nyitva tartás:
        </h2>
                <div className='opening white-text'>
                    <div className='opening__days'>
                        <p>Hétfő</p>
                        <p>Kedd</p>
                        <p>Szerda</p>
                        <p>Csütörtök</p>
                        <p>Péntek</p>
                        <p>Szombat</p>
                        <p>Vasárnap</p>
                    </div>
                    <div className='opening__hours'>
                        <p>10:00 - 22:00</p>
                        <p>10:00 - 22:00</p>
                        <p>10:00 - 22:00</p>
                        <p>10:00 - 22:00</p>
                        <p>10:00 - 22:00</p>
                        <p>10:00 - 22:00</p>
                        <p>10:00 - 22:00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FindUs;