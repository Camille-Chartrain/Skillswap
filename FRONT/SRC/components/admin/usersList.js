import User from '../admin/user/index';
import { useCallback, useEffect, useState } from 'react';
import Error from '../error/error';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import logout from '../../style/pictures/logout.svg';



//= details' Users are totally show only when the user is logged


const Admin = (reset, setError, error, handleNotFoundError, handleLogout) => {

    const [usersList, setUsersList] = useState([]);


    const GetUsersList = useCallback(async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/admin`, {
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

    useEffect(() => { GetUsersList() }, [GetUsersList]);

    //=redirect for update user
    const navigate = useNavigate();

    //=  user's datas before go to user component
    const handlechange = (user) => {
        console.log('handlechange: ', user)
        const id = user.id;
        console.log('HC recup id:', id);
        navigate('/user/',
            {
                state: { user }
            })
    };

    const UserDelete = useCallback(async (user) => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/user/${user.id}`, {
                method: "delete",
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
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
        <>
            <span className='ancre'>
                <>
                    <img className="" src={logout} alt='icone de deconnexion' onClick={handleLogout} />
                </>
            </span>




            <h4>nous avons : </h4> <span>{usersList.count} membres</span>
            <span className="user" >
                {error && <Error error={error} />}
                <ul className="user-li" >
                    {
                        usersList.rows && usersList.rows.length > 0 && usersList?.rows?.map((user) => (
                            <li key={user.id}>
                                < User
                                    key={user?.id}
                                    id={user?.id}
                                    firstname={user?.firstname}
                                    lastname={user?.lastname}
                                    birthday={user?.birthday}
                                    email={user?.email}
                                    grade_level={user?.rade_level}
                                    presentation={user?.presentation}
                                    createdAt={user?.createdAt}
                                    count={user?.count}
                                />
                                <button className="orangeBtn" onClick={handlechange.bind(null, user)}>EDITER</button>
                                <button className="redBtn" onClick={UserDelete}>SUPPRIMER</button>
                            </li>
                        ))
                    }
                </ul>

            </span >
        </>
    )

}
export default Admin;



