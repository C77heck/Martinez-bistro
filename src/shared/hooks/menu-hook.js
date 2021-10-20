import { useState, useCallback } from 'react'
import { objectSorting } from '../../utility/objectSorting';



export const useMenu = () => {

    const [menu, setMenu] = useState([]);
    const [types, setTypes] = useState({
        burgers: [],
        platillos: [],
        mexicanos: [],
        double: [],
        nachos: [],
        arroz: [],
        dippers: [],
        desserts: [],
        extras: [],
        drinks: []
    })
    const saveMenu = useCallback((menu) => {
        setMenu(menu)
        //we sort the array to types made up of arrays so the layout will work out
        setTypes(objectSorting(menu))
        //we save it to the local storage
        localStorage.setItem('menu', JSON.stringify(menu))
    }, [])


    const addMenuItem = useCallback((item) => {

        const storedMenu = JSON.parse(localStorage.getItem('menu'));
        storedMenu.push(item);
        setMenu(storedMenu);
        setTypes(objectSorting(storedMenu));
        localStorage.setItem('menu', JSON.stringify(storedMenu))
    },[]);


    const removeItem = useCallback((identifier) => {
        //filter out the item being deleted
        //perhaps split these below.
        const storedMenu = JSON.parse(localStorage.getItem('menu'))
        .filter(i => i.identifier !== identifier);
        
        setMenu(storedMenu)
        setTypes(objectSorting(storedMenu))
        localStorage.setItem('menu', JSON.stringify(storedMenu))
    },[])


    return { menu, saveMenu, types, removeItem, addMenuItem }
}