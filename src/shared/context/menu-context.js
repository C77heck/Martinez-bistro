import { createContext } from 'react';

export const MenuContext = createContext({
    menu: [],
    orderableList: [],
    types: {},
    saveMenu: () => { },
    addMenuItem: () => { },
    removeItem: () => { },
    setOrderable: () => { },
})