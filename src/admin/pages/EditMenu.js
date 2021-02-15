import React, { useState } from 'react';


import Menu from '../../menu/page/Menu';
import EditModal from '../components/EditModal';


const EditMenu = () => {
    const [show, setShow] = useState(false)

    const onClickHandler = e =>{
        e.target.id
    }

    return (
        <React.Fragment>
            <EditModal
                show={show}
                onClear={() => { setShow(false) }}
            > 
            
            </EditModal>

            <Menu
                onClick={(e) => { setShow(true); console.log(e.target.id); }}
            />

        </React.Fragment>
    )
}


export default EditMenu;