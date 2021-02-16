import { createContext } from 'react';

export const MenuContext = createContext({
    menu: [],
    types: {},
    count: '',
    saveMenu: () => { },
    clearCount: () => { }
})