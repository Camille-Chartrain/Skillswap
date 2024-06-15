
import Money from "./money";
import SkillRating from './skillRating';

const Statistic = ({ wallet, GetMoney }) => {


    return (

        <div className="statistic">
            <h2 id="statistic">STATISTIQUES</h2>
            <span className="statistic-section">
                <Money
                    wallet={wallet}
                    GetMoney={GetMoney}
                />
                <SkillRating />
            </span>
        </div >

    )
};
export default Statistic;