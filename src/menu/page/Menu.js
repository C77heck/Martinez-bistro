import React from 'react';
import MenuTopSec from '../../admin/components/MenuTopSec';

import Layout from '../components/Layout';

const Menu = props => {

    return (
        <div className={`menu ${props.className}`}>
            {!props.admin ? <h1 className='menu-title'>El poco loco menü</h1> : <MenuTopSec />}
            <Layout onClick={props.onClick} />
        </div>
    )
}

export default Menu;