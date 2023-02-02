import { priceFormat, redirect } from '../../utility/helpers';
import { useState, useContext } from 'react';
import { OrderContext } from '../../shared/context/order-context';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import Backdrop from '../../shared/UIElements/Backdrop';

export const MobileOrderDetails = props => {
    const [show, setShow] = useState(false);
    const { remove, addedItems, totalPrice } = useContext(OrderContext);

    return <div className='mobile-order-details'>
        <h2
            className='fs-22 text-align-center'
            onClick={() => setShow(!show)}
        >Kiválasztott termékek</h2>
        {show && <Backdrop onClick={() => setShow(false)} className={'z-0'} />}
        {show && <div className={'order-details-mobile flex-column'}>
            <div className='display-flex justify-content-around w-100 basket-header mb-1'>
                <h4 className='fs-16'>Termék</h4>
                <h4 className='fs-16'>Ár</h4>
            </div>
            <div>
                {addedItems.map(i => <PickedFood key={i._id} item={i} remove={remove} isCheckout={true} />)}
            </div>
        </div>}

        <div className='display-flex justify-content-around hr--light mt-2 pt-1 pb-1'>
            <h2 className='fs-22 fw-800'>Összesen:</h2>
            <h2 className='fs-22 fw-800'>{priceFormat(totalPrice)}</h2>
        </div>
        <div className='position-center fix-height-0'>
            <CheckoutButton link={'/checkout'} items={addedItems} />
        </div>
    </div>
}

export const DesktopOrderDetails = props => {
    const { remove, addedItems, totalPrice } = useContext(OrderContext);
    const neededHeight = (addedItems.length * 28) + 230;

    return <div className={`fix-width-350 fix-height-${neededHeight} order-details flex-column`}>
        <h2 className='fs-22 text-align-center pb-2'>Kiválasztott termékek</h2>
        <div className='display-flex justify-content-around w-100 basket-header mb-1'>
            <h4 className='fs-16'>Termék</h4>
            <h4 className='fs-16'>Ár</h4>
        </div>
        <div>
            {addedItems.map(i => <PickedFood key={i._id} item={i} remove={remove} isCheckout={true} />)}
        </div>
        <div className='display-flex justify-content-around hr--light mt-2 pt-1 pb-1'>
            <h2 className='fs-22 fw-800'>Összesen:</h2>
            <h2 className='fs-22 fw-800'>{priceFormat(totalPrice)}</h2>
        </div>
        <div className='position-center fix-height-0'>
            <CheckoutButton link={'/checkout'} items={addedItems} />
        </div>
    </div>
}

const CheckoutButton = props => {
    const [show, setShow] = useState(false);
    const onClickHandler = () => {
        if (!props.items.length) {
            setShow(true)
        } else {
            redirect(props.link)
        }
    }
    return <div>
        <ErrorModal
            error={show}
            onClear={() => setShow(false)}
            errorMessage={'Kérünk elöbb válassz ételt. :)'}
            className={'light-error-modal'}
        />
        <button
            className='order-button'
            onClick={onClickHandler}
        >
            <span>Megrendelem</span>
        </button>
    </div>
}

export const PickedFood = props => {
    const { totalPrice, name, amount } = props.item;

    return <div className='display-flex justify-content-between p-px-10'>
        <div className='fix-width-140'>
            <h5 className='fs-16 white-space-nowrap'>{name}</h5>
        </div>
        <div className='fix-width-40'>
            <h5 className='fs-16 white-space-nowrap'>{amount} db</h5>
        </div>
        <div className='fix-width-50'>
            <h5 className='fs-16'>{priceFormat(totalPrice)}</h5>
        </div>
        {props.isCheckout && <div className='fix-width-20'>
            <h5
                onClick={() => props.remove(props.item)} className='fs-16 hover-primary active-translate'
            >&#10006;</h5>
        </div>}
    </div>;
}