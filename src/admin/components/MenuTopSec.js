import React from 'react';


const MenuTopSec = () => {
    return (
        <div className='top-section'>
            <div className='top-section__help'>
                <h2>Útmutató</h2>
                <ul>
                    <li>Kattints valtoztandó ételre hogy felhozd az opció menüt</li>
                    <li>Itt átírhatod a kívánt adatokat</li>
                    <li>A mentes gombra kattintva pedig véglegesíted a változásokat</li>
                    <li>A törlés gomb törli az ételt.</li>
                    <li>Ha mégsem változtatnál kattints a vissza gombra</li>
                    <li>Az ételek elhelyezkedése a típus besorolástól függ</li>
                    <li>tehát annak megváltoztatása az étel áthelyezese lesz az étlapon belül</li>
                    <li>A "+" gomb étel/ital hozzáadását teszi lehetővé a menühöz</li>
                </ul>
            </div>
        </div>
    )
}


export default MenuTopSec;