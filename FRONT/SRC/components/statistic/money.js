import { useState } from "react";

export const Money = () => {

    const [donatedMoney, setDonatedMoney] = useState(0);
    const [receivedMoney, setReceivedMoney] = useState(2);
    const [totalMoney, setTotalMoney] = useState(2);


    const updateReceivedMoney = (amount) => {
        setReceivedMoney(receivedMoney + amount);
        setTotalMoney(receivedMoney + donatedMoney + amount);
    }

    const updateDonatedMoney = (amount) => {
        setDonatedMoney(donatedMoney + amount);
        setTotalMoney(receivedMoney + donatedMoney + amount);
    }



    return (
        <div className="skillsList">
            <h3>Coffre au tresor</h3>
            <ul>
                <span>
                    <li> Swappies totals : {totalMoney}</li>
                    <li> Swappies recus: {receivedMoney}</li>
                    <li> Swappies donnes : {donatedMoney}</li>
                </span>
            </ul>
        </div>
    )
}

export const transactionMoney = () => {

    //= manage moneys' transactions
    const [amount, setAmount] = useState({ updateReceivedMoney, updateDonatedMoney });

    //= updating the amount
    const handleChangeAmount = (e) => { setAmount(parseFloat(e.target.value)) };
    const handleSubmitReception = () => { updateReceivedMoney(amount); setAmount(0); };
    const handleSubmitDon = () => { updateDonatedMoney(amount); setAmount(0); };


    return (
        <>
            <div >
                <h4>Achat d'un cours</h4>
                <input type="number" value={amount} onChange={handleChangeAmount} />
                <button onClick={handleSubmitDon}>VALIDER</button>
            </div>

            <div>
                <h4>Vous avez recu :</h4>
                <input type="number" value={amount} onChange={handleChangeAmount} />
                <button onClick={handleSubmitReception}>VALIDER</button>
            </div>
        </>
    )
}