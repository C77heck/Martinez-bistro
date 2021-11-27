import { useEffect } from "react";
import Input from "../../shared/form-elements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_PHONE } from "../../utility/validators";


export const UserDetails = props => {
    const [inputState, inputHandler] = useForm({
        name: {
            value: '',
            valid: false
        },
        phone: {
            value: '',
            valid: true
        },
        email: {
            value: '',
            valid: false
        },
    });

    useEffect(() => {
        props.getValues && props.getValues(inputState);
    }, [inputState, inputHandler])

    return <div className='display-flex w-100 justify-content-between'>
        <Input
            id='name'
            label='Név'
            onInput={inputHandler}
            value={inputState.inputs.name.value}
            errorText='Kérlek add meg az neved.'
            validators={[VALIDATOR_REQUIRE()]}
            type='text'
            contClass='w-30'
            className='h-px-35 border-radius-px-4 fs-19'
            labelClass='fs-17'
        />
        <Input
            id='phone'
            label='Telefonszám'
            onInput={inputHandler}
            value={inputState.inputs.phone.value}
            errorText='Kérlek add meg a telefonszámodat.'
            validators={[VALIDATOR_PHONE()]}
            type='text'
            contClass='w-30'
            className='h-px-35 border-radius-px-4 fs-19'
            labelClass='fs-17'
        />
        <Input
            id='email'
            label='E-mail cím'
            onInput={inputHandler}
            value={inputState.inputs.email.value}
            validators={[VALIDATOR_EMAIL()]}
            type='text'
            contClass='w-30'
            className='h-px-35 border-radius-px-4 fs-19'
            labelClass='fs-17'
        />
    </div>;
}