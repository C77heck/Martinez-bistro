import React from 'react';
import Modal from '../../shared/UIElements/Modal';



const EditModal = props => {
    return (
        <Modal
            show={props.show}
            onCancel={props.onClear}
        >
            {props.children}
        </Modal>
    )
}


export default EditModal;
