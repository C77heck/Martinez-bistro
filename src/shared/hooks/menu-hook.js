import { useState, useCallback, useEffect } from 'react'
import { objectSorting } from '../../utility/objectSorting';



export const useMenu = () => {

    const [menu, setMenu] = useState([]);
    const [count, setCount] = useState(0);
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
        // count here is to induce a rerender artifically when updating the menu
        setCount(1)
        //we sort the array to types made up of arrays so the layout will work out
        setTypes(objectSorting(menu))
    }, [])

    const clearCount = useCallback((numb) => {
        setCount(numb)
    })
    return { menu, saveMenu, types, count, clearCount }
}