import { useState, useEffect } from "react";
import { Storage } from "../../utility/StorageHelper";

export const useOrder = () => {
    const [addedItems, setAddedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const storage = new Storage('order');

    const calcTotal = (items) => {
        if (!items.length) {
            return 0;
        }

        if (items.lenght === 1) {
            return parseFloat(items[0].totalPrice);
        }

        return items.map(i => parseFloat(i.totalPrice)).reduce((a, b) => a + b);
    }

    useEffect(() => {
        if (storage.has()) {
            setAddedItems(storage.get());
        }
    }, [])

    useEffect(() => {
        setTotalPrice(calcTotal(addedItems));
    }, [addedItems])

    // TODO -> Will have to merge items that belong together. and only change the number.
    const add = (item) => {
        const amountAdded = { ...item, amount: 1, totalPrice: parseFloat(item.price) };
        let alreadExists = false;
        const mappedItems = addedItems.map(i => {
            if (i._id === amountAdded._id) {
                alreadExists = true;
                i.amount += 1;
            }
            i.totalPrice = parseFloat(i.price) * i.amount;

            return i;
        })

        const finalItems = alreadExists ? mappedItems : [...addedItems, amountAdded];
        storage.set(finalItems);
        setAddedItems(finalItems);
    };

    const remove = (item) => {
        let isZeroAmount = false;

        const mappedItems = addedItems.map(i => {
            if (i._id === item._id) {
                isZeroAmount = i.amount < 2;
                i.amount -= 1;
            }
            i.totalPrice = parseFloat(i.price) * i.amount;

            return i;
        })

        const finalItems = isZeroAmount ? mappedItems.filter(i => i._id !== item._id) : mappedItems;

        storage.set(finalItems);

        setAddedItems(finalItems);
    };

    const clearOrder = () => {
        storage.clear()
    }

    return { addedItems, totalPrice, add, remove, clearOrder };
};