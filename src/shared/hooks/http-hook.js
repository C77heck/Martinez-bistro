import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {AuthContext} from '../context/auth-context';
import {get} from '../helpers/util';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const activeHttpRequests = useRef([])
    const {getIsAdminValidated} = useContext(AuthContext);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        const httpAbortCtrll = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrll);
        try {
            setIsLoading(true)

            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrll.signal
            });
            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrll)
            /* this code is to filter the abort controllers out if the request didn't have to be cancelled */
            if (!response.ok) {
                throw new Error(get(responseData, 'message', 'Sajnáljuk de valami nem sikerült.'));
            }
            setIsLoading(false);
            return responseData;
        } catch (err) {
            switch (err.message || '') {
                case 'FAILED_ADMIN_VALIDATION':
                    getIsAdminValidated(false);
                    break;
                default:
                    setError(get(err, 'message', err || 'Sajnáljuk de valami nem sikerült.'))
                    break;
            }
            setIsLoading(false);
        }
    }, [])

    const applicationError = (err) => {
        setError(err);
    }

    const clearError = () => {
        setError(null)
    }
    useEffect(() => {
        /* clean up if we leave the page */
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])
    return {sendRequest, isLoading, error, clearError, applicationError}
}
