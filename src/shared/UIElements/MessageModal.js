import React from 'react';

import Modal from './Modal';


const MessageModal = props => {
    return (
        <Modal
            className={`message-modal ${props.className}`}
            onCancel={props.onClear}
            header={props.header}
            show={!!props.message}
            backdropClasses={props.backdropClasses}
        >
            <h2>{props.message}</h2>
            {props.children}
        </Modal>
    );
};

export default MessageModal;