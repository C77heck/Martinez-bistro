import { createContext } from 'react';


export const ExpiryContext = createContext({
    menuExpiry: false,
    testimonialExpiry: false,
    openingExpiry: false,
    storyExpiry: false,
    updateExpiry: () => { }
})