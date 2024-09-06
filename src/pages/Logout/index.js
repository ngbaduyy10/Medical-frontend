import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import {Spin} from "antd";

function Logout () {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("persist:root");
        navigate("/login", { replace: true });
    }, [navigate]);

    return (
        <Spin fullscreen />
    );
}

export default Logout;