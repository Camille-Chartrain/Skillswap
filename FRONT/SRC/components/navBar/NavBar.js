
import Search from "../search/Search";
import { ToggleBtn, isLogged } from '../../util';


//= for manage link:visible only when the user is logged
import { isLogged } from '../../util';


//= Routes displayed depending if you are logged or not.. with islogged
const NavBar = () => {
    return (
        <>
            <span className="arianaWire">
                <div className='searchBar'>
                    <Search />
                    <ToggleBtn />
                </div>
            </span >
        </>
    )
}
export default NavBar;