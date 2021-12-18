import { useContext } from "react"
import { AuthContext } from "../../shared/context/auth-context";

export const AdminValidationPixel = () => {
    const { token, signout, isAdminValidated } = useContext(AuthContext);

    if (!isAdminValidated) {
        signout();
    }

    return <div />
}