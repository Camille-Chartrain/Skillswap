import Profile from "../profile";
import Learning from '../learning';
import Statistic from '../statistic';
import Communication from '../communication';



const Dashboard = () => {



    return (

        <>
            <main>
                <h1>Tableau de bord</h1>
                <Profile />
                <Learning />
                <Statistic />
                <Communication />
            </main>
        </>


    )
};
export default Dashboard;