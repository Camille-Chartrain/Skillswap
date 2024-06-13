// import { useForm, isValid } from "react-hook-form";
import Profile from "../profile";
import Learning from '../learning';
import Statistic from '../statistic';
import Communication from '../communication';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



//->ariana wire's icones
import account_icon from '../../style/pictures/account_icon.svg';
import school from '../../style/pictures/school.svg';
import statistic from '../../style/pictures/statistic.svg';
import message from '../../style/pictures/message.svg';
import logout from '../../style/pictures/logout.svg';
import Cookies from 'js-cookie';


const Dashboard = ({ handleSubmit, register, isValid, reset }) => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleClick = async () => {

        try {
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

    const verifyConnection = async () => {
        // redirection to login page if user is deconnected (doesn't have a cookie)
        const token = Cookies.get('token');
        if (!token) {
            console.log('Pas de token dans le cookie, redirection vers Login');

            setIsAuthenticated(false);
            navigate('/login');
        }

        else if (token) {
            try {
                // console.log('on essaie de fetch dans dashboard');
                const response = await fetch(`http://localhost:3000/dashboard`, {
                    method: "GET",
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const resultToken = await response.json();
                // console.log('response component dashboard:', resultToken);

                if (resultToken === "access granted") {
                    setIsAuthenticated(true);
                }
                else {
                    setIsAuthenticated(false);
                    navigate("/login");
                }
            }
            catch (error) {
                console.log("catch de resultToken dans Dashboard:", error);
            }
        }
    }

    // Le rendu de react est asynchrone =>
    // 1 le composant est initialisé (son return avec l'appel aux composants enfants est exécuté)
    // 2 le use effect est exécuté immédiatement après que ce composant ait été initialisé (il lit la fonction et l'exécute, et donne la rêgle pour futurs appels au composant Dashboard dans le tableau de dépendances, ici = ne pas redéclencher cette fonction)
    useEffect(() => { verifyConnection() }, [])


    // choix possible de mettre 'navigate' dans le tableau de dépendances mais pas sûre des implications.

    // FONCTIONNEMENT GESTION ACCES DASHBOARD
    // est ce que user connecté?
    // Cookies?  non => renvoyer vers page connexion
    //           oui => verifier le token: GET vers page /dashboard, 
    //                  verifie juste si token dans le back est le même que 
    //                  celui du navigateur.
    // if response token pas ok => redirect to connection
    // response token ok => return composant 


    if (!isAuthenticated) {
        return (null);
    }

    return (
        <>
            <div className='ancre'>
                <>
                    <a href="#profile" alt=" profile du membre" ><img className="" src={account_icon} alt='icone du profil ' /></a>
                    <a href="#learning" alt=" apprentissage du membre" ><img className="" src={school} alt='icone apprentissage ' /></a>
                    <a href="#statistic" alt=" statistic " ><img className="" src={statistic} alt='icone des statistiques ' /></a>
                    <a href="#communication" alt=" communication " ><img className="" src={message} alt='icone de communication ' /></a>
                    <img className="" src={logout} alt='icone de deconnexion' onClick={handleClick} />
                </>
            </div>
            <main>
                <h1>TABLEAU DE BORD</h1>
                <Profile handleSubmit={handleSubmit} register={register} reset={reset} />
                <Learning handleSubmit={handleSubmit} register={register} />
                <Statistic handleSubmit={handleSubmit} register={register} />
                <Communication handleSubmit={handleSubmit} register={register} />
            </main>
        </>
    )
};
export default Dashboard;