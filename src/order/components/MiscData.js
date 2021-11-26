import { useEffect, useState } from "react";
import Input from "../../shared/form-elements/Input";
import { useForm } from "../../shared/hooks/form-hook";

export const MiscData = props => {
    const [inputState, inputHandler] = useForm({
        note: {
            value: '',
            valid: false
        },
    });
    const [checkbox, setCheckbox] = useState({
        needTax: {
            value: false,
        },
        aszf: {
            value: false,
        },
        gdpr: {
            value: false,
        },
    })

    return <div className='display-flex align-items-baseline w-100 flex-column'>
        <Checkbox
            getValue={(value) => setCheckbox({ ...checkbox, needTax: value })}
            text={'Kérek áfás számlát'}
        />
        <Checkbox
            getValue={(value) => setCheckbox({ ...checkbox, aszf: value })}
            text={'Nyilatkoznod kell az ÁSZF-ről! Az Általános Szerződési Feltételeket (ÁSZF) elolvastam, megértettem és elfogadom'}
        />
        <Checkbox
            getValue={(value) => setCheckbox({ ...checkbox, gdpr: value })}
            text={'Nyilatkoznod kell az Adatkezelési szabályzatról! Az Adatkezelési tájékoztatót elolvastam, megértettem és elfogadom'}
        />

        <Input
            id='note'
            label='Megjegyzés'
            onInput={inputHandler}
            value={inputState.inputs.note.value}
            validators={[]}
            type='text'
            element='textarea'
            contClass='w-100'
        />
    </div>;
}


const Checkbox = props => {
    const [isActive, setIsActive] = useState(false);

    const handleOnClick = () => {
        setIsActive(!isActive);
        props.getValue(!isActive);
    }
    // TODO -> style it... also manag ethe data pasing.
    return <div>
        <button
            className={'question-button display-flex py-1'}
            onClick={() => handleOnClick()}
        >
            <div className={'display-flex question-circle justify-content-center align-items-center'}>
                <div className={`question-circle--filling background-color--secondary-1 ${!isActive && 'scale-0'}`} />
            </div>
            <span className={'typo-small-inter fw-700 pl-1'}>{props.text}</span>
        </button>
    </div>;
}