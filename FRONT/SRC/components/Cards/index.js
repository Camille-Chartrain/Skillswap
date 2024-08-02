import React from "react";
import './style.scss';

export default function Cards({
    dataCards,
    match,
    noMatch,
    loading
}) {
    console.log("dataCards", dataCards);



    return (
        <>
            <div>
                {loading && <p className="loading">chargement...</p>}

                {match && dataCards && dataCards.resultCount == 1 && (<p className="search-result">{dataCards.resultCount} résultat</p>)}

                {match && dataCards && dataCards.resultCount > 1 && (<p className="search-result">{dataCards.resultCount} résultats</p>)}

                {noMatch && <p className="search-result">Pas encore de cours pour vos critères, voici nos dernières nouveautés:</p>}
            </div>

            <div className="allCards">

                {dataCards && dataCards.rows && dataCards.rows.length > 0 && dataCards.rows.map((card) => (

                    <article key={card.id} className="card">

                        <div className="boxHeader">

                            <div className="childBoxHeader">
                                <p>{card.title}</p>
                                <p>{card.level}</p>
                                <p>{card.averageMark}</p>
                            </div>

                            <div className="chil2dBoxHeader">
                                <img className="avatar" src={`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/${card.Category.picture}`} alt="photo des categories"></img>

                                <p>{card.Category.name}</p>
                                <p>{card.SubCategory.name}</p>
                            </div>

                        </div>

                        <div className="boxContent">
                            <p>{card.description}</p>

                            <p>SKILLSWAPEUR:{`${card.User.firstname} ${card.User.lastname}`}</p>
                            <p>"{card.User.presentation}"</p>

                            <p>{card.availability}</p>
                            <p>{card.transmission}</p>
                        </div>

                        <div className="boxButton">
                            <button className="boxButton1" type="button">consulter le profil</button>
                            <button className="boxButton1" type="button">S'inscrire et participer</button>
                        </div>
                    </article >


                ))
                }
            </div>

        </>
    )
}