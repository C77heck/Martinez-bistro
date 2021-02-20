import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/form-elements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import MessageModal from '../../shared/UIElements/MessageModal';
import Modal from '../../shared/UIElements/Modal';
import { VALIDATOR_REQUIRE } from '../../utility/validators';


const AuthModal = () => {
    const { signin, signout, isLoggedIn, userId, token } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const [message, setMessage] = useState('')
    const [inputState, inputHandler, isFormValid, setFormData] = useForm({
        name: {
            value: '',
            valid: ''
        },
        password: {
            value: '',
            valid: ''
        }
    });

    const onSubmitHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_SIGNIN,
                'POST',
                JSON.stringify({
                    accountID: inputState.inputs.name.value,
                    password: inputState.inputs.password.value
                }),
                {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            )
            signin(responseData.adminData)
            setShow(false)
            setMessage(responseData.message)
        } catch (err) {
            console.log(err)
        }
    }

    const onCancelHandler = () => {
        setShow(false)
    }

    const onClearHandler = () => {
        setShow(false)
    }

    const signoutHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(process.env.REACT_APP_SIGNOUT + userId)
            signout()
            setMessage(responseData.message)
            setShow(false);
        } catch (err) {
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <MessageModal
                message={message}
                onClear={onClearHandler}
                className='admin-message-modal'
            />
            <Modal
                show={show}
                onCancel={onCancelHandler}
                onSubmit={onSubmitHandler}
                className='modal--auth'
            >
                <Input
                    id='name'
                    label='Fiók ID'
                    onInput={inputHandler}
                    value={inputState.inputs.name.value}
                    errorText='Kérlek add meg a fiók ID-et'
                    validators={[VALIDATOR_REQUIRE()]}
                    type='text'
                />
                <Input
                    id='password'
                    label='Jelszó'
                    onInput={inputHandler}
                    value={inputState.inputs.password.value}
                    errorText='Kérlek add meg a jelszavadat.'
                    validators={[VALIDATOR_REQUIRE()]}
                    type='password'
                />
                <button className='btn--save'>Mehet</button>
            </Modal>
            {!isLoggedIn ? <a
                id='auth-btn'
                onClick={() => setShow(true)}
            >
                Bejelentkezés
             </a> : <a
                    id='auth-btn'
                    onClick={signoutHandler}
                >
                    Kijelentkezés
             </a>}

        </React.Fragment>

    );
}

export default AuthModal;