import React, { useContext, useEffect, useState } from 'react';
import { ExpiryContext } from '../../shared/context/expiry-context';
import { useHttpClient } from '../../shared/hooks/http-hook';



const FindUs = () => {
    const { sendRequest } = useHttpClient()
    const [opening, setOpening] = useState({
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
    })
    const { openingExpiry } = useContext(ExpiryContext);

    useEffect(() => {
        (async () => {
            const responseData = await sendRequest(process.env.REACT_APP_OPENING)
            setOpening(responseData.opening)
            localStorage.setItem('opening', JSON.stringify(responseData.opening));
        })()
    }, [openingExpiry])


    return (
        <div className='find-us'>
            <div className='find-us__left'>
                <div className='map map__landing-page '>
                    <a
                        target='_blanc'
                        href='https://www.google.com/maps/place/El+poco+loco/@46.506658,18.4116852,15z/data=!4m5!3m4!1s0x0:0x253f81b5695e6d50!8m2!3d46.506658!4d18.4116852'
                    >
                        <img src='/img/map.jpg' alt='map' className='map-img' />
                    </a>

                </div>
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
                        <p>{opening.monday}</p>
                        <p>{opening.tuesday}</p>
                        <p>{opening.wednesday}</p>
                        <p>{opening.thursday}</p>
                        <p>{opening.friday}</p>
                        <p>{opening.saturday}</p>
                        <p>{opening.sunday}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FindUs;