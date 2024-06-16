import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dashboard from '../../style/pictures/dashboard.svg';
import logout from '../../style/pictures/logout.svg';


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
        <>

            <span className='ancre'>
                <>
                    <a href="/dashboard#profile" alt=" communication " ><img className="" src={dashboard} alt='icone de communication ' /></a>
                    <img className="" src={logout} alt='icone de deconnexion' onClick={handleLogout} />
                </>
            </span>

            <h1> DESOLE, VOTRE DEMANDE N'A PAS PU ABOUTIR </h1>
            <h5>ERREUR 404 : {error}</h5>
            <img src="" alt="" />
        </>
    )

}


export default Error;