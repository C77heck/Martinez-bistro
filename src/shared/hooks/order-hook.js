import { useCallback, useState } from "react";

export const useOrder = () => {
    const [addedItems, setAddedItems] = useState([]);

    // TODO -> Will have to merge items that belong together. and only change the number.
    const add = (item) => {
        const amontAdded = { ...item, amount: 1 };
        let alreadExists = false;
        const mappedItems = addedItems.map(i => {
            if (i._id === amontAdded._id) {
                alreadExists = true;
                i.amount += 1;
            }

            return i;
        })

        setAddedItems(alreadExists ? mappedItems : [...addedItems, amontAdded])
    };

    const remove = (item) => {
        let isZeroAmount = false;

        const mappedItems = addedItems.map(i => {
            if (i._id === item._id) {
                isZeroAmount = i.amount < 2;
                i.amount -= 1;
            }

            return i;
        })

        setAddedItems(isZeroAmount ? mappedItems.filter(i => i._id !== item._id) : mappedItems);
    };

    return { addedItems, add, remove };
};