import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { AuthModal } from '../components/AuthModal';
import EditAboutUs from '../components/EditAboutUs';
import EditNews from '../components/EditNews';
import EditOpening from '../components/EditOpening';

const Admin = () => {

    return (
        <React.Fragment>
            <div className='admin'>
                <h2>beállítások:</h2>
                <div className='admin__inner-border'>
  
                        <EditOpening />
                        <EditAboutUs />
                        <EditNews />
        
                    <div>
                        <Link
                            className='admin__menu'
                            to='/admin/menu'
                        >
                            <span>Menü</span>
                        </Link>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}





export default Admin;

