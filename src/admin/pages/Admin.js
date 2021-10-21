import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import AuthModal from '../components/AuthModal';
import EditAboutUs from '../components/EditAboutUs';
import EditNews from '../components/EditNews';
import EditOpening from '../components/EditOpening';

const Admin = () => {
    const { token, isLoggedIn } = useContext(AuthContext);

    return (
        <React.Fragment>
            <div className='admin'>
                <h2>beállítások:</h2>
                <div className='admin__inner-border'>

                    <EditOpening />
                    <EditAboutUs />
                    <EditNews />

                    <div>
                        <AuthModal>
                            <Link
                                className='admin__menu'
                                to={isLoggedIn ? '/admin/menu' : undefined}
                            >
                                <span>Menü</span>
                            </Link>
                        </AuthModal>

                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}





export default Admin;

