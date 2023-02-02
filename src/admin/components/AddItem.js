import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { MenuContext } from '../../shared/context/menu-context';
import CustomSelect from '../../shared/form-elements/CustomSelect';
import Input from '../../shared/form-elements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import MessageModal from '../../shared/UIElements/MessageModal';
import { VALIDATOR_REQUIRE } from '../../utility/validators';
import { foodTypes } from '../pages/EditMenu';
import AddModal from './AddModal';



const AddItem = props => {

    const { token, isLoggedIn } = useContext(AuthContext);
    const { addMenuItem } = useContext(MenuContext);
    const { sendRequest, error, clearError } = useHttpClient();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const [foodType, setFoodType] = useState('Étel típus');
    const [inputState, inputHandler] = useForm({
        name: {
            value: '',
            valid: false
        },
        description: {
            value: '',
            valid: true
        },
        price: {
            value: '',
            valid: false
        },
        id: {
            value: '',
            valid: false
        }
    });

    useEffect(() => {
        setFoodType(props.foodType)
    }, [props.foodType])


    const onSubmitHandler = async e => {
        e.preventDefault();

        try {

            const responseData = await sendRequest(
                process.env.REACT_APP_ADD_ITEM,
                'POST',
                JSON.stringify({
                    name: inputState.inputs.name.value,
                    description: inputState.inputs.description.value,
                    price: inputState.inputs.price.value,
                    type: foodType
                }),
                {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            )
            setMessage(responseData.message)
            setShow(false)
            addMenuItem(responseData.item)


        } catch (err) {

        }

    }

    const onChangeHandler = e => {
        const value = e.target.value;
        if (value !== '0') {
            setFoodType(value)
        }
    }
    const onClickHandler = () => {
        setShow(true);
    };

    const onClearHandler = () => {
        setShow(false);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <MessageModal
                onClear={() => { setMessage('') }}
                message={message}
                className='admin-message-modal'
            />

            <AddModal
                show={show}
                onClear={onClearHandler}
                className='modal--edit'
                onSubmit={onSubmitHandler}
            >
                <div className='modal--edit__content'>
                    <Input
                        id='name'
                        label='Étel neve'
                        onInput={inputHandler}
                        value={inputState.inputs.name.value}
                        errorText='Kérlek add meg az étel nevét.'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />

                    <Input
                        id='price'
                        label='Étel ára'
                        onInput={inputHandler}
                        value={inputState.inputs.price.value}
                        errorText='Kérlek add meg az étel árát.'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <CustomSelect
                        onChange={onChangeHandler}
                        initialValue={foodType}
                        selection={foodTypes}
                        id='custom-select1'
                        label='Étel típus'
                    />
                    <Input
                        id='description'
                        label='Alapanyag lista(Opcionalis)'
                        onInput={inputHandler}
                        value={inputState.inputs.description.value}
                        validators={[]}
                        type='text'
                        element='textarea'
                    />
                    <button className='btn--save'>Mentés</button>
                </div>
            </AddModal>

            <button
                onClick={isLoggedIn ? onClickHandler : undefined}
                className='btn--add cursor-pointer'
            >
                +
            </button>
        </React.Fragment>
    )
}


export default AddItem