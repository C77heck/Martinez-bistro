import React from 'react';

import Layout from '../components/Layout';

const Menu = props => {

    return (
        <div className='menu'>
            <h1 className='menu-title'>El poco loco menü</h1>
            <Layout onClick={props.onClick} />
        </div>
    )
}

export default Menu;