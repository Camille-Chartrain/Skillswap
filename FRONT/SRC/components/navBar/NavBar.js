
import Search from "../search/Search";
import { ToggleBtn } from '../../util';




//= Routes displayed depending if you are logged or not.. with islogged
const NavBar = (register, handleSubmit) => {
    return (
        <>
            <span className="arianaWire">
                <div className='searchBar'>
                    <Search register={register} handleSubmit={handleSubmit} />
                    <ToggleBtn />
                </div>
            </span >
        </>
    )
}
export default NavBar;