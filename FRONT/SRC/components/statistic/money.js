import { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';

const Money = ({ wallet, GetMoney }) => {
    // console.log("Money dans money", Money);
    // console.log("Money.User.swappies dans money", Money.User.swappies);

    // const [wallet, setWallet] = useState(null);

    // const GetMoney = useCallback(async () => {
    //     // console.log("qui a t il dans wallet:", wallet);
    //     try {
    //         const token = Cookies.get('token');
    //         const response = await fetch('http://localhost:3000/statistic', {
    //             method: "get",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             // credentials: 'include'
    //         });

    //         // console.log("les money data avant  .json", response);
    //         const dataMoney = await response.json();
    //         // console.log("les Money data  apres .json:", dataMoney);

    //         setWallet(dataMoney);
    //         // console.log('donnees Money data du state:', dataMoney);
    //         // console.log("dataWallet apres le setWallet:", dataWallet);
    //     }
    //     catch (error) {
    //         // console.log("catch de Get Money:", error.message);
    //     }
    // })

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


