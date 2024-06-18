
import Search from "../search/Search";
import { ToggleBtn } from '../../util';
import Error from '../error/error';



//= Routes displayed depending if you are logged or not.. with islogged
const NavBar = ({
    register,
    handleSubmit,
    dataSearch,
    setDataSearch,
    match,
    setMatch,
    onReset,
    noMatch,
    setNoMatch,
}) => {
    return (
        <>
            <span className="arianaWire">
                <span className='searchBar' aria-label="barre de recherche">
                    <Search
                        register={register}
                        handleSubmit={handleSubmit}
                        dataSearch={dataSearch}
                        setDataSearch={setDataSearch}
                        match={match}
                        setMatch={setMatch}
                        onReset={onReset}
                        noMatch={noMatch}
                        setNoMatch={setNoMatch}
                    />
                </span>
            </span >
        </>
    )
}
export default NavBar;