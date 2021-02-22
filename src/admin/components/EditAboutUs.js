import React, { useContext, useEffect, useState } from 'react';

import Modal from '../../shared/UIElements/Modal';
import Input from '../../shared/form-elements/Input';
import ImageUpload from '../../shared/form-elements/ImageUpload';
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
import { AuthModal } from './AuthModal';
import { AuthContext } from '../../shared/context/auth-context';

const EditAboutUs = () => {
    const {
        sendRequest,
        error,
        clearError,
    } = useHttpClient();
    const [message, setMessage] = useState('')
    const { isLoggedIn } = useContext(AuthContext);



    const [inputState, inputHandler, isFormValid, setFormData] = useForm({
        quote: {
            value: '',
            valid: false
        },
        text: {
            value: '',
            valid: false
        },
        image: {
            value: null,
            valid: false
        }
    });


    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_QUOTE);
                setFormData({
                    quote: {
                        value: responseData.testimonial.quote,
                        valid: true
                    },
                    text: {
                        value: responseData.testimonial.text,
                        valid: true
                    },
                    image: {
                        value: responseData.testimonial.image,
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
        const formData = new FormData();
        formData.append('quote', inputState.inputs.quote.value)
        formData.append('text', inputState.inputs.text.value)
        formData.append('image', inputState.inputs.image.value)
        try {

            const responseData = await sendRequest(
                process.env.REACT_APP_QUOTE,
                'PATCH',
                formData
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
                className='modal--about'
                onSubmit={onSubmitHandler}
            >
                <Input
                    id='quote'
                    label='Idézet'
                    onInput={inputHandler}
                    value={inputState.inputs.quote.value}
                    errorText='Az idézetnek minimum 15 és maximum 40 karakter lehet.'
                    validators={[
                        VALIDATOR_REQUIRE(),
                        VALIDATOR_MAXLENGTH(40),
                        VALIDATOR_MINLENGTH(15)
                    ]}
                    type='text'
                />
                <Input
                    id='text'
                    label='Rólunk leírás'
                    onInput={inputHandler}
                    value={inputState.inputs.text.value}
                    errorText='Az leírásnak minimum 100 és maximum 750 karakter lehet.'
                    validators={[
                        VALIDATOR_REQUIRE(),
                        VALIDATOR_MAXLENGTH(750),
                        VALIDATOR_MINLENGTH(100)
                    ]}
                    type='text'
                    element='textarea'
                />
                <ImageUpload
                    id='image'
                    onInput={inputHandler}
                    errorText='Válassz egy képet.'
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
                        className='admin__about-us'
                        onClick={!isLoggedIn ? undefined : modalHandler}
                    >
                        Rólunk
                </button>
                </div>
            </AuthModal>
        </React.Fragment>
    )
}

export default EditAboutUs;