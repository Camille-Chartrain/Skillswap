import User from './user';
// import { isLogged } from '../../util.js';
import { useEffect, useState } from 'react';


//= details' Users are totally show only when the user is logged


const UserList = () => {

    const [usersList, setUsersList] = useState([]);

    // const GetAllUsers = async (data) => {
    //     try {
    //         console.log('try data:', data);
    //         const token = Cookies.get('token');
    //         const response = await fetch('http://localhost:3000/', {
    //             method: "get",
    //             status: 200,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             body: JSON.stringify(data),
    //             credentials: 'include'
    //         })
    //         console.log('response.status:', response.status);

    //         //=traduct api response in Json
    //         console.log("response avant .json", response);
    //         const dataUsers = await response.json();
    //         console.log(" response apres .json:", dataUsers);
    //         setUsersList(dataUser);

    //         //=fetch back side's  errors
    //         console.log("error?:", dataUser.error);
    //         // setError(dataUser.error);

    //     }
    //     catch (error) {
    //         console.error("erreur du catch AllUsers",error);
    //     }
    // }

    const GetUsersList = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/`);
            const dataUser = await response.json();
            setUsersList(dataUser);
            console.log(dataUser);
        }
        catch (error) {
            console.error("erreur du catch GetUsersList", error);
        }
    }

    useEffect(() => { GetUsersList() }, [])

    return (
        <div className='container'>
            {
                usersList?.map((item) => (

                    < User
                        key={item?.id}
                        firstname={item?.firstname}
                        lastname={item?.lastname}
                        birthday={item?.birthday}
                        email={item?.email}
                        grade_level={item?.grade_level}
                        presentation={item?.presentation}
                        interests={item?.interests}
                    />
                ))
            }
        </div >
    )

}
export default UserList;



