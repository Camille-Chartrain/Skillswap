import User from './admin';
import { useEffect, useState } from 'react';


//= details' Users are totally show only when the user is logged


const Admin = () => {

    const [usersList, setUsersList] = useState([]);

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
export default Admin;



