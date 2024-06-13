import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";



const Error = ({ error, SetError }) => {




    const navigate = useNavigate();
    const location = useLocation();

    // =Code to do to manage error 404
    useEffect(() => {
        const handleNotFoundError = () => {
            console.log("Erreur 404 : Not Found");
            SetError(error);
            navigate("*");
        };

        if (location.pathname === '*') {
            handleNotFoundError();
        }
    }, []);

    return (
        <main>
            <h1> DESOLE, VOTRE DEMANDE N'A PAS PU ABOUTIR </h1>
            <h5>ERREUR 404 : {error}</h5>
            <img src="" alt="" />
        </main>
    )

}


export default Error;