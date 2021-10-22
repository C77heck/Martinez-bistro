import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import AuthModal from './AuthModal';

const MenuButton = (props) => {
    const { token, isLoggedIn } = useContext(AuthContext);

    return <div>
        <AuthModal>
            <Link
                className='admin__menu cursor-pointer'
                to={isLoggedIn ? '/admin/menu' : undefined}
            >
                <span>Menü</span>
            </Link>
        </AuthModal>

    </div>


}

export default MenuButton;