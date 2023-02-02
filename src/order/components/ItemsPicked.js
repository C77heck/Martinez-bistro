import { useContext } from "react";
import { OrderContext } from "../../shared/context/order-context";
import { ItemCard } from "./ItemCard";

export const ItemsPicked = props => {
    const { remove, addedItems, totalPrice } = useContext(OrderContext);

    return <div className=''>
        {addedItems.map(m => <ItemCard
            isCheckout={true}
            key={m._id}
            menuItem={m}
        />)}
    </div>
}