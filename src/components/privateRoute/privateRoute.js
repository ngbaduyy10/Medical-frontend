import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function PrivateRoute (props) {
    const {element, permissionRequired} = props;
    let permission = false;
    let tokenExpired = false;

    const token = localStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(token);

        if (decoded.exp < Date.now() / 1000) {
            tokenExpired = true;
        } else if (decoded && !permissionRequired) {
            permission = true;
        } else if (permissionRequired.includes(decoded.userType)) {
            permission = true;
        }
    }

    return (
        <>
            {tokenExpired ? (<Navigate to="/logout" replace={true} />) : (permission ? (element) : (<Navigate to="/unauthorized" replace={true} />))}

        </>
    )
}

export default PrivateRoute;