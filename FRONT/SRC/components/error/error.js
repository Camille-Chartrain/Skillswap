import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dashboard from '../../style/pictures/dashboard.svg';
import logout from '../../style/pictures/logout.svg';
import Cookies from 'js-cookie';


const Error = ({ error, SetError }) => {




    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = async () => {

        try {
            // setIsAuthenticated(false)
            // console.log("deconnection => supprimer cookie. (composant Dashboard)");
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/logout`, {
                method: "POST",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            // console.log("response", response);
            const resultLogout = await response.json();
            // console.log('response component dashboard logout:', resultLogout);

            // delete cookie JWT on client's side
            let thisToken = Cookies.remove('token');
            thisToken = null
            if (thisToken == null) {
                // console.log("token", thisToken);
                navigate("/");
            }
        }
        catch (error) {
            console.log("erreur :", error);
        };
    }

    // =Code to do to manage error 404
    useEffect(() => {
        const handleNotFoundError = () => {

            console.log("Erreur 404 : Not Found");
            SetError(error);
            console.log("erreur dans composant Error", error);
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