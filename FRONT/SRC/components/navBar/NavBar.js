
import Search from "../search/Search";
import { ToggleBtn } from '../../util';




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
    setNoMatch
}) => {
    return (
        <>
            <span className="arianaWire">
                <div className='searchBar'>
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
                    <ToggleBtn />
                </div>
            </span >
        </>
    )
}
export default NavBar;