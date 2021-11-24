import { createContext } from 'react';

export const OrderContext = createContext({
    totalPrice: 0,
    addedItems: [],
    add: () => { },
    remove: () => { },
})