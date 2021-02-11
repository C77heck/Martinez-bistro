import React, { useEffect, useState } from 'react';

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

const EditAboutUs = () => {
    const {
        sendRequest,
        isLoading,
        error,
        clearError,
        applicationError
    } = useHttpClient();




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

    // grab the current data so the user can edit it.
    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_QUOTE);
                console.log(responseData)
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
    const onClickHandler = async () => {

        /* do the submit here. */
    }



    return (
        <React.Fragment>
            <Modal
                show={show}
                onCancel={() => { setShow(false) }}
                className='modal--about'
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
                    onClick={onClickHandler}
                >
                    KÉSZ
                </Button>
            </Modal>

            <div>
                <button
                    className='admin__about-us'
                    onClick={modalHandler}
                >
                    Rólunk
                </button>
            </div>
        </React.Fragment>
    )
}

export default EditAboutUs;