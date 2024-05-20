import { useEffect, useState } from "react";

const Login = ({ input }) => {

    const [isLogged, setIsLogged] = useState(true);

    const handleSubmit = (e) => {
        e.eventDefault();
        setIsLogged();
    }

    const GetIsLogged = async () => {
        try {
            const response = await fetch(`http://localhost:3000/login`);
            const dataIsLogged = await response.json();
            setIsLogged(dataIsLogged)
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => { GetIsLogged() }, []);


    return (
        <>
            <h2>Connexion</h2>

            <form method="post" onSubmit={handleSubmit} className="formLogin">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Saisissez votre email" value={input} size="30" />
                <label htmlFor="password">Mot de passe</label>
                <input type="text" placeholder="Saisissez votre mot de passe" value={input} size="35" />
                <button>VALIDER</button>
            </form>
        </>
    )
}
export default Login;