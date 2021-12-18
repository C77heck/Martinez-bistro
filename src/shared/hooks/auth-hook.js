import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Storage } from '../../utility/StorageHelper';
import { useHttpClient } from './http-hook';


let timer;

export const useAuth = () => {
    const storage = new Storage('userData');
    const history = useHistory()

    const { sendRequest } = useHttpClient();
    const [token, setToken] = useState(false);
    const [expiration, setExpiration] = useState()
    const [userId, setUserId] = useState(false)
    const [drawer, setDrawer] = useState(false)

    const signin = useCallback((userData, expiration) => {

        setToken(userData.token);
        setUserId(userData.userId);
        // TODO -> will need redis for this
        const tokenExpiration = expiration || new Date().getTime() + 1000 * 60 * 30;// half an hour expiration time
        setExpiration(tokenExpiration);
        storage.set({
            userId: userData.userId,
            token: userData.token,
            expiration: tokenExpiration,
            favourites: userData.favourites
        });
    }, []);

    const disableDrawer = useCallback(() => {
        setDrawer(true)
    }, [])
    const enableDrawer = useCallback(() => {
        setDrawer(false)
    }, [])

    const signout = useCallback(async () => {
        setToken(null);
        setUserId(null)
        setExpiration(null)
        try {
            const userID = JSON.parse(localStorage.getItem('userData')).userId;
            localStorage.removeItem('userData')
            await sendRequest(process.env.REACT_APP_SIGNOUT + userID)
            history.push('/')
        } catch (err) {
            console.log(err)
        }
        return true;
    }, [sendRequest, history]);

    //AUTOMATED SINGIN/SIGNOUT BASED ON EXPIRATION TIME. 
    useEffect(() => {
        const storedData = storage.get();
        signin(storedData, new Date(storedData.expiration))

        // TODO -> review this in the future.
        // if (
        //     storedData &&
        //     storedData.token &&
        //     storedData.expiration > new Date().getTime()
        // ) {
        // }
    }, [signin]);

    // TODO -> review this in the future.
    // useEffect(() => {
    //     if (token && expiration) {
    //         const remainingTime = expiration - new Date().getTime();
    //         timer = setTimeout(signout, remainingTime)
    //     } else {
    //         clearTimeout(timer);
    //     }
    // }, [token, signout, expiration, userId])

    return { signin, signout, token, userId, drawer, disableDrawer, enableDrawer }
}