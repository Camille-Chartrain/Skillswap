import User from './admin';
import { useCallback, useEffect, useState } from 'react';
import Error from '../error/error';


//= details' Users are totally show only when the user is logged


const Admin = (register, handleSubmit, setValue, reset, setError, error, handleNotFoundError) => {

    const [usersList, setUsersList] = useState([]);


    const GetUsersList = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3000/`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log("data avtJson:", response);
            const dataUser = await response.json();
            console.log("data aps Json:", dataUser);
            setUsersList(dataUser);
            console.log("state getUser:", usersList);
        }
        catch (error) {
            console.error("erreur du catch GetUsersList", error);
        }
    }, []);

    useEffect(() => { GetUsersList() }, [GetUsersList])


    //=post method to send info
    const UserPatch = async (data) => {
        try {
            console.log('data envoyees:', data);
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: 'PATCH',
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
                // credentials: 'include',
            })

            // console.log('response.status:', response.status);

            //=traduct api response in Json
            // console.log("response post User avant .json", response);
            const dataUser = await response.json();
            console.log(" response apres .json:", dataUser);

            //=fetch back side's  errors
            // console.log("error?:", dataUser.error);
            // setError(error);

        }
        catch (error) {
            console.error("catch UserPatch : ", error);
            setError("Erreur lors de la modification de l'utilisateur");
            handleNotFoundError("Erreur lors de la modification de l'utilisateur");
        }
    };

    const UserDelete = useCallback(async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3000/profile', {
                method: "delete",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            console.log("response avant .json", response);
            //=traduct api response from Json to JS
            const dataUser = await response.json();
            console.log("response json analysee:", dataUser);

            if (dataUser === "deletion ok") {
                reset();

                // delete cookie JWT on client's side
                let token = Cookies.remove('token');
                token = null
                if (token == null) {
                    console.log("token", token);
                    navigate("/");
                }
            }
            else {
                throw new Error("Invalid response from API");
                setError(error);
            }
        }
        catch (error) {
            console.log("catch UserDelete :", error);
            setError("L'utilisateur n'a pas pu etre supprime");
            handleNotFoundError("L'utilisateur n'a pas pu etre supprime");
        }
    });
    return (
        <span className="user">
            {error && <Error error={error} />}
            <ul className="user-li">
                {
                    usersList?.map((item) => (
                        <li>
                            < User
                                key={item?.id}
                                firstname={item?.firstname}
                                lastname={item?.lastname}
                                {skill.map()je map sur skill si il y a un skill}
                            skill={item?.skill?.title}
                            money={item?.skill?.money}
                            />
                        </li>
                    ))
                }
            </ul>
            <button className="orangeBtn">EDITER</button>
            <button className="redBtn">SUPPRIMER</button>
        </span >
    )

}
export default Admin;



