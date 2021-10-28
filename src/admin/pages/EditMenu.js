import React, { useContext, useState } from 'react';


import Menu from '../../menu/page/Menu';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../utility/validators';
import EditModal from '../components/EditModal';
import Input from '../../shared/form-elements/Input';
import CustomSelect from '../../shared/form-elements/CustomSelect';
import { useHttpClient } from '../../shared/hooks/http-hook';
import MessageModal from '../../shared/UIElements/MessageModal';
import { MenuContext } from '../../shared/context/menu-context';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { AuthModal } from '../components/AuthModal';



export const foodTypes = [
    { value: 'burger', english: 'burgers', id: 1 },
    { value: 'platillos', english: 'platillos', id: 2 },
    { value: 'platillos mexicanos', english: 'mexicanos', id: 3 },
    { value: 'dupla tál', english: 'double', id: 4 },
    { value: 'nachos', english: 'nachos', id: 5 },
    { value: 'arroz', english: 'arroz', id: 6 },
    { value: 'dippers', english: 'dippers', id: 7 },
    { value: 'italok', english: 'drinks', id: 8 },
    { value: 'extrák', english: 'extras', id: 9 },
    { value: 'desszertek', english: 'desserts', id: 10 }
];

const EditMenu = () => {

    const { isLoggedIn } = useContext(AuthContext);
    const { sendRequest, error, clearError } = useHttpClient();
    const [inputState, inputHandler, isFormValid, setFormData] = useForm({
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
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const [foodType, setFoodType] = useState('');
    const { menu, saveMenu, removeItem } = useContext(MenuContext);
    const { token } = useContext(AuthContext);
    const onClickHandler = e => {
        setShow(true);
        console.log(menu, e.target.id);
        menu.map(i => {
            if (i.identifier === e.target.id) {
                setFormData({
                    name: {
                        value: i.name,
                        valid: true
                    },
                    description: {
                        value: i.description,
                        valid: true
                    },
                    price: {
                        value: i.price,
                        valid: true
                    },
                    identifier: {
                        value: i.identifier,
                        valid: true
                    },
                    id: {
                        value: i._id,
                        valid: true
                    }
                })
                setFoodType(i.type)
            }
        })
    }
    // the customSelect components onChange handler grabs the value 
    const onChangeHandler = e => {
        const value = e.target.value;
        if (value !== '0') {
            setFoodType(value)
        }
    }
    const onSubmitHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(process.env.REACT_APP_UPDATE_MENU,
                'PATCH',
                JSON.stringify({
                    name: inputState.inputs.name.value,
                    description: inputState.inputs.description.value,
                    price: inputState.inputs.price.value,
                    type: foodType,
                    id: inputState.inputs.id.value
                }),
                {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            )
            onClearHandler()
            setMessage(responseData.message)
            // we save the changes to the context data so it can update the menu right away
            saveMenu(() => {
                return menu.map(i => {
                    if (i.identifier === inputState.inputs.identifier.value) {
                        i.name = inputState.inputs.name.value;
                        i.description = inputState.inputs.description.value;
                        i.price = inputState.inputs.price.value;
                        i.type = foodType;
                    }
                    return i;
                })
            });

        } catch (err) {

        }


    }
    const deleteHandler = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_DELETE_ITEM,
                'DELETE',
                JSON.stringify({
                    id: inputState.inputs.id.value,
                    name: inputState.inputs.name.value
                }),
                {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            )
            onClearHandler()
            removeItem(inputState.inputs.identifier.value)
            setMessage(responseData.message);

        } catch (err) {
            console.log(err)
        }
    };



    const onClearHandler = () => { setShow(false) }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <MessageModal
                onClear={() => { setMessage('') }}
                message={message}
                className='admin-message-modal'
            />
            <EditModal
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
                        id='custom-select2'
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
                    <div className='btn-container'>

                        <button
                            className='btn--cancel'
                            type='button'
                            onClick={onClearHandler}
                        >
                            Vissza
                        </button>

                        <button
                            className='btn--save'
                        >
                            Mentés
                        </button>

                        <button
                            className='btn--delete'
                            type='button'
                            onClick={deleteHandler}
                        >
                            Törlés
                        </button>

                    </div>
                </div>
            </EditModal>
            <AuthModal>
                <Menu
                    admin={true}
                    onClick={!isLoggedIn ? undefined : onClickHandler}
                />
            </AuthModal>
        </React.Fragment>
    )
}


export default EditMenu;