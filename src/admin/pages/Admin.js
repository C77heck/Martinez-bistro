import React, { useState } from 'react';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import EditAboutUs from '../components/EditAboutUs';
import EditNews from '../components/EditNews';
import EditOpening from '../components/EditOpening';
import MenuButton from '../components/MenuButton';

const Admin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const getData = (val) => {
        setIsLoading(val);
    }
    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='admin'>
                <h2>beállítások:</h2>
                <div className='admin__inner-border'>
                    <EditOpening isLoading={(val) => getData(val)} />
                    <EditAboutUs />
                    <EditNews />
                    <MenuButton />
                </div>
            </div>
        </React.Fragment>
    )
}





export default Admin;

