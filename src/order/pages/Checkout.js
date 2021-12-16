import { UserDetails } from "../components/UserDetails";
import { useContext, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { MiscData } from '../components/MiscData';
import { DatePicker } from "../components/DatePicker";
import { Hr } from "../../shared/UIElements/Hr";
import { OrderContext } from "../../shared/context/order-context";
import MessageModal from "../../shared/UIElements/MessageModal";
import { redirect } from "../../utility/helpers";
import { ItemsPicked } from "../components/ItemsPicked";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import { Storage } from '../../shared/helpers/storage';
import { get } from "../../shared/helpers/util";

export const Checkout = props => {
    const { addedItems, clearOrder } = useContext(OrderContext)
    const storage = new Storage('uniqueOrderId');
    let data = {
        userData: {},
        pickup: '',
        misc: {},
        addedItems,
        uniqueId: storage.get()?.uniqueId,
    };
    const getValues = (values, prop, isValid) => {
        console.log('FIRED', data, prop, isValid);
        data[prop] = { values, isValid };
    }
    // TODO -> card to display orderd items
    return <div className='full-screen max-width-vw-90 m-3 mt-14 display-flex align-items-center flex-column'>
        <div className='w-px-800 py-2 '>
            <h2 className='fs-22 fw-800'>Kiválasztott ételek</h2>
            <ItemsPicked />
        </div>
        <div className='w-px-800 py-2 '>
            <h2 className='fs-22 fw-800'>Rendelés átvevője</h2>
            <UserDetails getValues={(values, isValid) => getValues(values, 'userData', isValid)} />
        </div>
        <Hr type={'light'} size={80} />
        <div className='w-px-800 py-2 display-flex justify-content-start flex-column align-items-baseline'>
            <h2 className='fs-22 fw-800'>Rendelés átvételének időpontja</h2>
            <DatePicker getValues={(values, isValid) => getValues(values, 'pickup', isValid)} />
        </div>
        <Hr type={'light'} size={80} />
        <div className='w-px-800 py-2 '>
            <h2 className='fs-22 fw-800'>Egyéb</h2>
            <MiscData getValues={(values, isValid) => getValues(values, 'misc', isValid)} />
        </div>
        <Hr type={'light'} size={80} />
        <div className='w-px-800 py-2 position-center'>
            <OrderButton getData={() => new OrderObject(data)} onSuccess={clearOrder} />
        </div>
    </div>;
}


// TODO -> this button to be for the next page.
const OrderButton = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const [message, setMessage] = useState('');
    const [customError, setCustomError] = useState('');
    // TODO -> Make sure they checked out the aszf and gdpr boxes...
    const order = async () => {
        try {
            const data = JSON.stringify(props.getData(), null, {});
            const responseData = await sendRequest(
                process.env.REACT_APP_PLACE_ORDER,
                'POST',
                data,
                { 'Content-Type': 'application/json' }
            )

            if (props.onSuccess) {
                props.onSuccess();
            }

            setMessage(responseData.message || 'Köszönjük a rendelésed')
        } catch (err) {
            setCustomError(err.message);

            console.log(err, error);
        }
    }

    return <div>
        <MessageModal
            onClear={() => redirect('/')}
            message={message}
            className='admin-message-modal'
        />
        <MessageModal
            onClear={() => setCustomError('')}
            message={customError}
            className='admin-error-modal'
        />
        <button
            className='order-button'
            onClick={order}
        >
            <span>Megrendelem</span>
        </button>
    </div>
}


class OrderObject {
    items;
    pickupDate;
    name;
    email;
    phone;
    tax;
    note;
    uniqueId;
    constructor(data) {
        this.items = data.addedItems.map(i => ({ id: i._id, amount: i.amount }));
        this.pickupDate = getData(data, 'pickup', 'Kérünk válassz átvételi idő pontot');
        this.name = getData(data, 'userData.inputs.name.value', 'Kérünk add meg a nevedet');
        this.email = getData(data, 'userData.inputs.email.value', 'Kérünk add meg az email címed');
        this.phone = getData(data, 'userData.inputs.phone.value', 'Kérünk add meg a telefon számodat');
        this.tax = getData(data, 'misc.checkboxes.needTax.value', '', false);
        this.note = getData(data, 'misc.note', '', false);
        this.uniqueId = getData(data, 'uniqueId', 'RELOAD');
    }
}

const getData = (baseObject, prop, errorMessage, isRequired = true) => {
    const value = get(baseObject, prop, '')
    console.log(value);
    if (!!value) {
        return value;
    }

    if (isRequired) {
        throw new Error(errorMessage, 400)
    }

    return '';
}