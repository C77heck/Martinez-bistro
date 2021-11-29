import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/form-elements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import MessageModal from '../../shared/UIElements/MessageModal';
import Modal from '../../shared/UIElements/Modal';
import { redirect } from '../../utility/helpers';
import { VALIDATOR_REQUIRE } from '../../utility/validators';


export const AuthModal = props => {
    const { signin, isLoggedIn, disableDrawer, enableDrawer } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const { sendRequest, error, clearError } = useHttpClient();
    const [message, setMessage] = useState('')
    const [inputState, inputHandler] = useForm({
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
        e.stopPropagation();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_SIGNIN,
                'POST',
                JSON.stringify({
                    accountID: inputState.inputs.name.value,
                    password: inputState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
            signin(responseData.adminData)
            setShow(false)
            setMessage(responseData.message)
            enableDrawer(false)
        } catch (err) {
            console.log(err)
        }
    }

    const onCancelHandler = () => {
        setShow(false)
        enableDrawer(false)
    }

    const onClearHandler = () => {
        setMessage('')
        enableDrawer(false)
    }

    const onClickHandler = () => {
        setShow(true);
        disableDrawer(true);
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
            <div
                onClick={!isLoggedIn ? onClickHandler : undefined}
            >
                {props.children}
            </div>

        </React.Fragment>

    );
}



export const AuthButton = props => {
    const { isLoggedIn, signout, userId } = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [message, setMessage] = useState('')

    const signoutHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_SIGNOUT}/${userId}`)
            signout()
            redirect('/admin');

            setMessage(responseData.message)
        } catch (err) {
            setMessage(err)
            console.log(err)
        }
    }
    return (
        <AuthModal >
            <a
                href='#'
                id='auth-btn'
                onClick={isLoggedIn ? signoutHandler : undefined}
            >
                {!isLoggedIn ? 'Bejelentkezés' : 'Kijelentkezés'}
            </a>
        </AuthModal>

    )
}

export default AuthModal;