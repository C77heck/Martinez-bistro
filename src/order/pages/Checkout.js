import { UserDetails } from "../components/UserDetails";
import { useContext, useEffect, useState } from 'react';
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
const propsToCheckForValidity = ['userData', 'pickup', 'misc']
export const Checkout = props => {
    const { addedItems, clearOrder } = useContext(OrderContext)
    const storage = new Storage('uniqueOrderId');
    const [isFormValid, setIsFormValid] = useState(false);
    const [data, setData] = useState({
        userData: {},
        pickup: '',
        misc: {},
        addedItems,
        uniqueId: storage.get()?.uniqueId,
    });
    const getValues = (values, prop, isValid) => {
        setData({
            ...data,
            [prop]: { values, isValid },
        })
    }

    // TODO -> Figure the form validity logic. something is wrong we do not get the data properly from the data
    // object.
    useEffect(() => {
        let falsy = 0;
        for (const prop in data) {
            if (data.hasOwnProperty(prop) && propsToCheckForValidity.includes(prop)) {
                if (!data[prop].isValid) {
                    falsy += 1;
                }
            }
        }

        setIsFormValid(!falsy);
    }, [data])

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
            <OrderButton
                isFormValid={isFormValid}
                getData={() => new OrderObject(data)} onSuccess={clearOrder}
            />
        </div>
    </div>;
}


// TODO -> this button to be for the next page.
const OrderButton = props => {
    const { sendRequest, error, clearError } = useHttpClient();
    const [message, setMessage] = useState('');
    const [customError, setCustomError] = useState('');
    const [redir, setRedir] = useState(false);
    // TODO -> Make sure they checked out the aszf and gdpr boxes...
    const order = async () => {
        try {
            const data = JSON.stringify(props.getData(), null, {});

            if (!props.isFormValid) {
                throw new Error('Kérlek győzödj meg róla, hogy helyes adatokat adtál meg.');
            }

            const responseData = await sendRequest(
                process.env.REACT_APP_PLACE_ORDER,
                'POST',
                data,
                { 'Content-Type': 'application/json' }
            )
            console.log({ responseData });
            if (props.onSuccess) {
                props.onSuccess();
            }

            setMessage(get(responseData, 'message', 'Köszönjük a rendelésed'))
        } catch (err) {
            console.log(err, err.message);
            switch (get(err, 'message', '')) {
                case 'FATAL_ERROR':
                    setCustomError('Sajnáljuk de a rendelés leadás nem sikertült, kérünk próbáld újra.')
                    setRedir(true);
                    break;
                default:
                    setCustomError(get(err, 'message', ''));
                    break;
            }
        }
    }

    return <div>
        <MessageModal
            onClear={() => redirect('/')}
            message={message}
            className='admin-message-modal'
        />
        <MessageModal
            onClear={() => {
                setCustomError('');
                if (redir) {
                    redirect('/')
                }
            }}
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
    gdpr;
    aszf;
    note;
    uniqueId;
    constructor(data) {
        this.items = data.addedItems.map(i => ({ id: i._id, amount: i.amount }));
        this.name = getData(data, 'userData.values.inputs.name.value', 'Kérünk add meg a nevedet');
        this.phone = getData(data, 'userData.values.inputs.phone.value', 'Kérünk add meg a telefon számodat');
        this.email = getData(data, 'userData.values.inputs.email.value', 'Kérünk add meg az email címed');
        this.pickupDate = getData(data, 'pickup.values', 'Kérünk válassz átvételi idő pontot');
        this.tax = getData(data, 'misc.values.checkboxes.needTax.value', '', false);
        this.tax = getData(data, 'misc.values.checkboxes.gdpr.value', 'Nem egyeztél bele az adatvédelmi szabályzatunkba');
        this.tax = getData(data, 'misc.values.checkboxes.aszf.value', 'Nem egyeztél bele az általános szerződési feltételekbe');
        this.note = getData(data, 'misc.values.note', '', false);
        this.uniqueId = getData(data, 'uniqueId', 'FATAL_ERROR');
    }
}

const getData = (baseObject, prop, errorMessage, isRequired = true) => {
    const value = get(baseObject, prop, '')
    console.log({ baseObject, prop, errorMessage, value });
    if (!!value) {
        return value;
    }

    if (isRequired) {
        throw new Error(errorMessage, 400)
    }

    return '';
}