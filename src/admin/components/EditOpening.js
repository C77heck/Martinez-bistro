import React, { useState, useContext } from 'react';


import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Modal from '../../shared/UIElements/Modal';
import Input from '../../shared/form-elements/Input';
import Button from '../../shared/UIElements/Button';
import MessageModal from '../../shared/UIElements/MessageModal';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { AuthModal } from './AuthModal';




const EditOpening = (props) => {
    const {
        sendRequest,
        error,
        clearError,
    } = useHttpClient()

    const [inputState, inputHandler] = useForm({
        mondayOpen: {
            value: '',
            valid: false
        },
        mondayClose: {
            value: '',
            valid: false
        },
        tuesdayOpen: {
            value: '',
            valid: false
        },
        tuesdayClose: {
            value: '',
            valid: false
        },
        wednesdayOpen: {
            value: '',
            valid: false
        },
        wednesdayClose: {
            value: '',
            valid: false
        },
        thursdayOpen: {
            value: '',
            valid: false
        },
        thursdayClose: {
            value: '',
            valid: false
        },
        fridayOpen: {
            value: '',
            valid: false
        },
        fridayClose: {
            value: '',
            valid: false
        },
        saturdayOpen: {
            value: '',
            valid: false
        },
        saturdayClose: {
            value: '',
            valid: false
        },
        sundayOpen: {
            value: '',
            valid: false
        },
        sundayClose: {
            value: '',
            valid: false
        }
    })

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const { token, isLoggedIn } = useContext(AuthContext);


    const onSubmitHandler = async e => {
        e.preventDefault();
        try {
            props.isLoading(true);

            const responseData = await sendRequest(
                process.env.REACT_APP_OPENING,
                'PATCH',
                JSON.stringify({
                    monday: inputState.inputs.mondayOpen.value
                        + '-' + inputState.inputs.mondayClose.value,
                    tuesday: inputState.inputs.tuesdayOpen.value
                        + '-' + inputState.inputs.tuesdayClose.value,
                    wednesday: inputState.inputs.wednesdayOpen.value
                        + '-' + inputState.inputs.wednesdayClose.value,
                    thursday: inputState.inputs.thursdayOpen.value
                        + '-' + inputState.inputs.thursdayClose.value,
                    friday: inputState.inputs.fridayOpen.value
                        + '-' + inputState.inputs.fridayClose.value,
                    saturday: inputState.inputs.saturdayOpen.value
                        + '-' + inputState.inputs.saturdayClose.value,
                    sunday: inputState.inputs.sundayOpen.value
                        + '-' + inputState.inputs.sundayClose.value
                }),
                {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            )
            setMessage(responseData.message)
            props.isLoading(false);

            setShow(false)

        } catch (err) {
            props.isLoading(false);
            console.log(err)
        }

    }

    const modalHandler = () => {
        setShow(true)
    }

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={clearError}
            />
            <MessageModal
                onClear={() => { setMessage('') }}
                message={message}
                className='admin-message-modal'
            />
            <Modal
                show={show}
                onCancel={() => { setShow(false) }}
                className='modal--opening'
                onSubmit={onSubmitHandler}
            >
                <div className='opening-item'>

                    <Input
                        id='mondayOpen'
                        label='Hétfő'
                        onInput={inputHandler}
                        value={inputState.inputs.mondayOpen.value}
                        validators={[]}
                        type='time'
                    />
                    <Input
                        id='mondayClose'
                        onInput={inputHandler}
                        value={inputState.inputs.mondayClose.value}
                        validators={[]}
                        type='time'
                    />

                </div>
                <div className='opening-item'>

                    <Input
                        id='tuesdayOpen'
                        label='Kedd'
                        onInput={inputHandler}
                        value={inputState.inputs.tuesdayOpen.value}
                        validators={[]}
                        type='time'
                    />
                    <Input
                        id='tuesdayClose'
                        onInput={inputHandler}
                        value={inputState.inputs.tuesdayClose.value}
                        validators={[]}
                        type='time'
                    />
                </div>
                <div className='opening-item'>

                    <Input
                        id='wednesdayOpen'
                        label='Szerda'
                        onInput={inputHandler}
                        value={inputState.inputs.wednesdayOpen.value}
                        validators={[]}
                        type='time'
                    />
                    <Input
                        id='wednesdayClose'
                        onInput={inputHandler}
                        value={inputState.inputs.wednesdayClose.value}
                        validators={[]}
                        type='time'
                    />

                </div>
                <div className='opening-item'>

                    <Input
                        id='thursdayOpen'
                        label='Csütörtök'
                        onInput={inputHandler}
                        value={inputState.inputs.thursdayOpen.value}
                        validators={[]}
                        type='time'
                    />
                    <Input
                        id='thursdayClose'
                        onInput={inputHandler}
                        value={inputState.inputs.thursdayClose.value}
                        validators={[]}
                        type='time'
                    />

                </div>
                <div className='opening-item'>

                    <Input
                        id='fridayOpen'
                        label='Péntek'
                        onInput={inputHandler}
                        value={inputState.inputs.fridayOpen.value}
                        validators={[]}
                        type='time'
                    />
                    <Input
                        id='fridayClose'
                        onInput={inputHandler}
                        value={inputState.inputs.fridayClose.value}
                        validators={[]}
                        type='time'
                    />

                </div>
                <div className='opening-item'>

                    <Input
                        id='saturdayOpen'
                        label='Szombat'
                        onInput={inputHandler}
                        value={inputState.inputs.saturdayOpen.value}
                        validators={[]}
                        type='time'
                    />
                    <Input
                        id='saturdayClose'
                        onInput={inputHandler}
                        value={inputState.inputs.saturdayClose.value}
                        validators={[]}
                        type='time'
                    />

                </div>
                <div className='opening-item'>

                    <Input
                        id='sundayOpen'
                        label='Vasárnap'
                        onInput={inputHandler}
                        value={inputState.inputs.sundayOpen.value}
                        validators={[]}
                        type='time'
                    />
                    <Input
                        id='sundayClose'
                        onInput={inputHandler}
                        value={inputState.inputs.sundayClose.value}
                        validators={[]}
                        type='time'
                    />
                </div>

                <Button
                    buttonClass='btn--submit btn--blue'
                    type='submit'
                >
                    MEHET
                </Button>
            </Modal>
            <AuthModal>
                <div>
                    <button
                        className='admin__opening cursor-pointer'
                        onClick={!isLoggedIn ? undefined : modalHandler}
                    >
                        Nyitás
                 </button>
                </div>
            </AuthModal>
        </React.Fragment>
    )
}

export default EditOpening;