import React from "react";
import BannerPc from './pictures/BannerPc.png';
import Logo from './pictures/Logo.svg';




const Header = () => {
    return (
        <header>
            <a href="/" alt="logo du site" ><img src=".p/ictures/Logo.svg " /></a>
            <div>
                <input type="search" placeholder="rechercher" />
                <button>loupe</button>
            </div>
        </header >
    )
}
export default Header;