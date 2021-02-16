import React from 'react';
import Modal from '../../shared/UIElements/Modal';



const EditModal = props => {
    return (
        <Modal
            show={props.show}
            onCancel={props.onClear}
            onSubmit={props.onSubmit}
            className={props.className}
        >
            {props.children}
        </Modal>
    )
}


export default EditModal;
