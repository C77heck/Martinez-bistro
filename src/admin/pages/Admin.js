import React from 'react';
import EditAboutUs from '../components/EditAboutUs';
import EditNews from '../components/EditNews';
import EditOpening from '../components/EditOpening';
import MenuButton from '../components/MenuButton';

const Admin = () => {

    return (
        <React.Fragment>
            <div className='admin'>
                <h2>beállítások:</h2>
                <div className='admin__inner-border'>
                    <EditOpening />
                    <EditAboutUs />
                    <EditNews />
                    <MenuButton />
                </div>
            </div>
        </React.Fragment>
    )
}





export default Admin;

