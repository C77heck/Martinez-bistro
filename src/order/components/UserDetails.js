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

    return <div className='display-flex w-100 justify-content-between'>
        <Input
            id='name'
            label='Név'
            onInput={inputHandler}
            value={inputState.inputs.name.value}
            errorText='Kérlek add meg az neved.'
            validators={[VALIDATOR_REQUIRE()]}
            type='text'
        />
        <Input
            id='phone'
            label='Telefonszám'
            onInput={inputHandler}
            value={inputState.inputs.phone.value}
            errorText='Kérlek add meg a telefonszámodat.'
            validators={[VALIDATOR_PHONE()]}
            type='text'
        />
        <Input
            id='email'
            label='E-mail cím'
            onInput={inputHandler}
            value={inputState.inputs.email.value}
            validators={[VALIDATOR_EMAIL()]}
            type='text'
        />
    </div>;
}