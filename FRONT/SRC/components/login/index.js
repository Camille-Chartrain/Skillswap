import { useState } from "react";

const Login = ({ input }) => {

    const [isLogged, setIsLogged] = useState(true);

    const handleSubmit = (e) => {
        e.eventDefault();
        setIsLogged();
    }

    const GetIsLogged = async () => {
        try {
            const response = await fetch("http://localhost:3000/login");
            const dataIsLogged = await response.json();
            setIsLogged(dataIsLogged)
        }
        catch (error) {
            console.log(error.message);
        }
    }


    return (
        <>
            <h1>Connexion</h1>

            <form action="post" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Saisissez votre email" value={input} />
                <label htmlFor="password">Mot de passe</label>
                <input type="text" placeholder="Saisissez votre mot de passe" value={input} />
                <button>Valider</button>
            </form>
        </>
    )
}
export default Login;