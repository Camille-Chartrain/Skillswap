const Registration = () => {
    async function handleSubmit(event) {
        event.preventDefault();

        console.log("log de mon event.target");
        console.log(event.target);

        const formData = new FormData(event.target);
        const data = new URLSearchParams(formData)

        console.log("log de data");
        console.log(data);
        console.log(data.get("firstname"));

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
                    <input type="text" id="prenom" name="firstname" value="john" />

                    <label for="nom">Nom :</label>
                    <input type="text" id="nom" name="lastname" value="Doe" />

                    <label for="email">Email :</label>
                    <input type="email" id="email" name="email" value="john@mail.com" />

                    <label for="mdp">mdp :</label>
                    <input type="text" id="mdp" name="hash" value="johnmdp" />

                    <button type="submit">Envoyer</button>
                </form>
            </div>
        </>
    )
};
export default Registration;