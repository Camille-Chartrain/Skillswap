const Registration = () => {
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        await fetch("http://localhost:3000/registration", {
            method: 'POST',
            body: data,
        })

    }
    return (
        <>
            <h1>Registration</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label for="prenom">prénom :</label>
                    <input type="text" id="prenom" name="firstname" />

                    <label for="nom">Nom :</label>
                    <input type="text" id="nom" name="lastname" />

                    <label for="email">Email :</label>
                    <input type="email" id="email" name="email" />

                    <label for="mdp">mdp :</label>
                    <input type="text" id="mdp" name="hash" />

                    <button type="submit">Envoyer</button>
                </form>
            </div>
        </>
    )
};
export default Registration;