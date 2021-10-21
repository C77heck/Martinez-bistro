import React, { useContext, useEffect, useState } from 'react';

import Modal from '../../shared/UIElements/Modal';
import Input from '../../shared/form-elements/Input';
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
    VALIDATOR_MAXLENGTH
} from '../../utility/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/UIElements/Button';
import MessageModal from '../../shared/UIElements/MessageModal';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { AuthModal } from './AuthModal';

const EditNews = () => {
    const {
        sendRequest,
        error,
        clearError,
    } = useHttpClient();
    const [message, setMessage] = useState('')

    const { token, isLoggedIn } = useContext(AuthContext);


    const [inputState, inputHandler, isFormValid, setFormData] = useForm({
        firsth2: {
            value: '',
            valid: false
        },
        firsth3: {
            value: '',
            valid: false
        },
        firstp: {
            value: '',
            valid: false
        },
        secondh2: {
            value: '',
            valid: false
        },
        secondp: {
            value: '',
            valid: false
        }
    });


    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_STORIES);

                setFormData({
                    firsth2: {
                        value: responseData.story.firsth2,
                        valid: true
                    },
                    firsth3: {
                        value: responseData.story.firsth3,
                        valid: true
                    },
                    firstp: {
                        value: responseData.story.firstp,
                        valid: true
                    },
                    secondh2: {
                        value: responseData.story.secondh2,
                        valid: true
                    },
                    secondp: {
                        value: responseData.story.secondp,
                        valid: true
                    }
                })
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])


    const [show, setShow] = useState(false)

    const modalHandler = () => {
        setShow(true)
    }

    const onSubmitHandler = async e => {
        e.preventDefault();

        try {

            const responseData = await sendRequest(
                process.env.REACT_APP_STORIES,
                'PATCH',
                JSON.stringify({
                    firsth2: inputState.inputs.firsth2.value,
                    firsth3: inputState.inputs.firsth3.value,
                    firstp: inputState.inputs.firstp.value,
                    secondh2: inputState.inputs.secondh2.value,
                    secondp: inputState.inputs.secondp.value
                }),
                {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            )
            setMessage(responseData.message);
            setShow(false);
        } catch (err) {
            console.log(err)
        }

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
                className='modal--news'
                onSubmit={onSubmitHandler}
            >
                <div className={'display-flex justify-flex-center flex'}>
                    <div className={'flex-basis-50'}>
                        <Input
                            id='firsth2'
                            label='Első hír főcíme'
                            onInput={inputHandler}
                            value={inputState.inputs.firsth2.value}
                            errorText='Az idézetnek minimum 15 és maximum 40 karakter lehet.'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <Input
                            id='firsth3'
                            label='Első hír alcíme'
                            onInput={inputHandler}
                            value={inputState.inputs.firsth3.value}
                            errorText='Az leírásnak minimum 100 és maximum 750 karakter lehet.'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                    </div>
                    <div className={'flex-basis-50'}>
                        <Input
                            id='firstp'
                            label='Első hír szövege'
                            onInput={inputHandler}
                            value={inputState.inputs.firstp.value}
                            errorText='Az leírásnak minimum 100 és maximum 750 karakter lehet.'
                            validators={[
                                VALIDATOR_REQUIRE(),
                                VALIDATOR_MAXLENGTH(450),
                                VALIDATOR_MINLENGTH(100)
                            ]}
                            type='text'
                            element='textarea'
                        />
                    </div>
                </div>

                <div className='hr-line' />
                <Input
                    id='secondh2'
                    label='Második hír főcíme'
                    onInput={inputHandler}
                    value={inputState.inputs.secondh2.value}
                    errorText='Az leírásnak minimum 100 és maximum 750 karakter lehet.'
                    validators={[VALIDATOR_REQUIRE()]}
                    type='text'
                />
                <Input
                    id='secondp'
                    label='Második hír szövege'
                    onInput={inputHandler}
                    value={inputState.inputs.secondp.value}
                    errorText='Az leírásnak minimum 100 és maximum 750 karakter lehet.'
                    validators={[
                        VALIDATOR_REQUIRE(),
                        VALIDATOR_MAXLENGTH(450),
                        VALIDATOR_MINLENGTH(100)
                    ]}
                    type='text'
                    element='textarea'
                />

                <Button
                    buttonClass='btn--submit btn--blue'
                    type='submit'
                    disabled={isFormValid}
                >
                    MEHET
                </Button>
            </Modal>
            <AuthModal>
                <div>
                    <button
                        className='admin__story'
                        onClick={!isLoggedIn ? undefined : modalHandler}
                    >
                        Hírek
                </button>
                </div>
            </AuthModal>
        </React.Fragment>
    )
}

export default EditNews;