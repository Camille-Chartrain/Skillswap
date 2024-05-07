
import { useContext } from "react";
import { ThemeContext } from "../../util";



// const theme = useContext(ThemeContext);


const Header = () => {

    return (
        <>
            <img src="" alt="banniere du site Skillswap" />
            {/* <button id="dark" onClick={toogleTheme}>dark icone jour nuit</button> */}
            <a src="" alt="logo du site" >img logo</a>
            <div>
                <input type="search" value="" placeholder="Rechercher" />
                <button>img loupe</button>
            </div>
        </>

    )

};
export default Header;