
import Money from "./money";
import SkillRating from './skillRating';

const Statistic = ({ wallet, GetMoney }) => {


    return (

        <span className="statistic">
            <h2 id="statistic">STATISTIQUES</h2>
            <span className="statistic-section">
                <Money
                    wallet={wallet}
                    GetMoney={GetMoney}
                />
                <SkillRating />
            </span>
        </span >

    )
};
export default Statistic;