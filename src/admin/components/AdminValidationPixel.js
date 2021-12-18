import { useContext, useEffect } from "react"
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';

export const AdminValidationPixel = () => {
    const { isAdminValidated } = useHttpClient();
    const { token, signout } = useContext(AuthContext);

    useEffect(() => {
        if (!!token && !isAdminValidated) {
            signout();
        }
    }, [isAdminValidated])

    return <div />
}