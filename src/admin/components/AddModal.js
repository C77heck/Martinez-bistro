import React from 'react';

import Modal from '../../shared/UIElements/Modal';

const AddModal = props => {
    return (
        <Modal
            show={props.show}
            onCancel={props.onClear}
            className={props.className}
            onSubmit={props.onSubmit}
        >
            {props.children}
        </Modal>
    )
}


export default AddModal;
