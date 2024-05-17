import React from "react";
import BannerPc from './pictures/BannerPc.png';




const Header = () => {
    return (
        <>
            <header>
                <img className="banner" src={BannerPc} alt='banniere du site Skillswap' />
            </header >

        </>

    )
}
export default Header;