// import { useForm, isValid } from "react-hook-form";
import Profile from "../profile";
import Learning from '../learning';
import Statistic from '../statistic';
import Communication from '../communication';
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

//->ariana wire's icones
import account_icon from '../../style/pictures/account_icon.svg';
import school from '../../style/pictures/school.svg';
import statistic from '../../style/pictures/statistic.svg';
import message from '../../style/pictures/message.svg';
import logout from '../../style/pictures/logout.svg';
import Cookies from 'js-cookie';


const Dashboard = ({
    handleSubmit,
    register,
    isValid,
    reset,
    isAuthenticated,
    setIsAuthenticated,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedCategory,
    setSelectedCategory,
    selectLevel,
    setSelectLevel }) => {

    const navigate = useNavigate();
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // wallet and getMoney created in dashboard so that component Statistic and Learning
    // can both have acces to getMoney function, => when a course is terminated in
    // component Learning, we call the function GetMoney to have a dynamic display of 
    // the swappie in the component Statistic.
    const [wallet, setWallet] = useState(null);


    const GetMoney = useCallback(async () => {
        console.log("qui a t il dans wallet:", wallet);
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/statistic', {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include'
            });

            // console.log("les money data avant  .json", response);
            const dataMoney = await response.json();
            // console.log("les Money data  apres .json:", dataMoney);

            setWallet(dataMoney);
            // console.log('donnees Money data du state:', dataMoney);
            // console.log("dataWallet apres le setWallet:", dataWallet);
        }
        catch (error) {
            // console.log("catch de Get Money:", error.message);
        }
    })

    const handleClick = async () => {

        try {
            setIsAuthenticated(false)
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
                console.log("state du isAunthenticated dans logout dashboard ", isAuthenticated);
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
                    console.log("ACCES AUTORISE DANS VERIFY CONNECTION DASHBOARD");
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

    // à continuer
    // if (!isAuthenticated) {
    //     return (
    //         <p>Veuillez vous connecter</p>
    //     );
    // }

    return (
        <>
            <span className='ancre'>
                <>
                    <a href="#profile" alt=" profile du membre" ><img className="" src={account_icon} alt='icone du profil ' /></a>
                    <a href="#learning" alt=" apprentissage du membre" ><img className="" src={school} alt='icone apprentissage ' /></a>
                    <a href="#statistic" alt=" statistic " ><img className="" src={statistic} alt='icone des statistiques ' /></a>
                    <a href="#communication" alt=" communication " ><img className="" src={message} alt='icone de communication ' /></a>
                    <img className="" src={logout} alt='icone de deconnexion' onClick={handleClick} />
                </>
            </span>
            <main>
                <h1 className="dashboard">TABLEAU DE BORD</h1>
                <Profile
                    handleSubmit={handleSubmit}
                    register={register}
                    reset={reset}
                    setSelectedSubCategory={setSelectedSubCategory}

                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}

                    selectLevel={selectLevel}
                    setSelectLevel={setSelectLevel}
                />
                <Learning
                    handleSubmit={handleSubmit}
                    register={register}
                    GetMoney={GetMoney}
                />

                <Statistic
                    handleSubmit={handleSubmit}
                    register={register}
                    wallet={wallet}
                    GetMoney={GetMoney}
                />
                <Communication handleSubmit={handleSubmit} register={register} />
            </main>
        </>
    )
};
export default Dashboard;