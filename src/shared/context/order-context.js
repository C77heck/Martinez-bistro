import { createContext } from 'react';

export const OrderContext = createContext({
    addedItems: [],
    add: () => { },
    remove: () => { },
})