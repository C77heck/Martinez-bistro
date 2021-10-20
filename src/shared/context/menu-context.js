import { createContext } from 'react';

export const MenuContext = createContext({
    menu: [],
    types: {},
    saveMenu: () => { },
    addMenuItem: () => { },
    removeItem: () => { }
})