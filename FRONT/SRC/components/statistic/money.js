import { useEffect } from "react";


const Money = ({ wallet, GetMoney }) => {
    // console.log("Money dans money", Money);

    useEffect(() => { GetMoney() }, []);

    return (

        <span className="statisticList">
            <h3>Coffre au tresor</h3>
            <ul>
                <span className="money">
                    {/* {console.log("voir wallet:", wallet)} */}
                    {wallet && <li className="statistic-li"> Swappies totals : <span className="int">{wallet[0].User?.swappies}</span></li>}
                    {wallet && <li className="statistic-li"> Swappies recus: <span className="int">{wallet[0].User?.swappiesWinned}</span></li>}
                    {wallet && <li className="statistic-li">Swappies donnes : <span className="int">{wallet[0].User?.swappiesSpent}</span></li>}
                </span>
            </ul>
        </span>

    )
}
export default Money;


