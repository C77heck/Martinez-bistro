import { useContext, useEffect } from "react"
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';

export const AdminValidationPixel = () => {
    const { token, signout, isAdminValidated } = useContext(AuthContext);
    console.log(1, isAdminValidated);
    useEffect(() => {
        console.log(2);

        if (!isAdminValidated) {
            console.log(3);

            signout();
        }
    }, [isAdminValidated])

    return <div />
}