
import Money from "./money";
import SkillRating from './skillRating';

const Statistic = () => {


    return (
        <main>
            <div className="statistic">
                <h2 id="statistic">STATISTIQUES</h2>
                <span className="statistic-section">
                    <Money />
                    <SkillRating />
                </span>
            </div >
        </main >
    )
};
export default Statistic;