import React, { useState } from 'react';

import Modal from '../../shared/UIElements/Modal';

const EditOpening = () => {
    const [show, setShow] = useState(false)

    const onClickHandler = () => {
        setShow(true)
    }


    return (
        <React.Fragment>
            <Modal
                show={show}
                onCancel={() => { setShow(false) }}
                className='modal--opening'
            >

            </Modal>
            <div>
                <button
                    className='admin__opening'
                    onClick={onClickHandler}
                >
                    Nyitva tartás
                 </button>
            </div>
        </React.Fragment>
    )
}

export default EditOpening;