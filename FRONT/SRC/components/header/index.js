import React from "react";
import BannerPc from './pictures/BannerPc.png';
import logo from './pictures/logo.png';
import { ToggleBtn } from '../../util';
import { Link } from "react-router-dom";

//->ariana wire's icones
// import SearchIcon from '@mui/icons-material/Search';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonIcon from '@mui/icons-material/Person';
// import PersonOffIcon from '@mui/icons-material/PersonOff';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import CommentIcon from '@mui/icons-material/Comment';
// import SchoolIcon from '@mui/icons-material/School';
// import LeaderboardIcon from '@mui/icons-material/Leaderboard';



const search = async () => {
    try {
        const response = await fetch("https://localhost:3000");

        const title = await response.json();
        console.log(title)
    }
    catch (error) {
        console.error(error.message);
    }
}
search()


//= Routes displayed depending if you are logged or not..
// const isLogged = false;

const Header = () => {
    return (
        <>
            <header>
                <img className="banner" src={BannerPc} alt='banniere du site Skillswap' />
                <span className="arianaWire">
                    <a href="/" alt="logo du site" ><img className="logo" src={logo} alt='blogo du site Skillswap' /></a>
                    <div className="search">
                        <input type="search" placeholder="rechercher" />
                        <button>Level</button>
                        <button>category</button>
                        <button>sub-category</button>
                        <button>loupe</button>
                    </div>
                    <div>
                        {/* {isLogged ? ( */}
                        <>
                            {/* <a dashboard">dashboard</Link>
                            <Link to="/profile">profile</Link>
                            <Link to="/learning">learning</Link>
                            <Link to="/statistic">statistis</Link>
                            <Link to="/communication">communication</Link>
                            <Link to="/logout">logout</Link> */}
                        </>
                        {/* ) : (<Link to="/" />)} */}
                    </div>
                    <ToggleBtn />



                </span>
            </header >
        </>

    )
}
export default Header;