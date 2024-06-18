import { useEffect } from "react";


const Money = ({ wallet, GetMoney }) => {
    // console.log("Money dans money", Money);


    // state wallet and function getMoney created in dashboard so that component Statistic and Learning
    // can both have acces to getMoney function, => when a course is terminated in
    // component Learning, we call the function GetMoney to have a dynamic display of 
    // the swappie in the component Statistic.

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


