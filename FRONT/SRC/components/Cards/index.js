import React from "react";
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGraduationCap, faSignal } from '@fortawesome/free-solid-svg-icons';

export default function Cards({
    dataCards,
    match,
    noMatch,
    loading
}) {
    console.log("dataCards", dataCards);


    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    };



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

                        <h3>{card.title.toUpperCase()}</h3>

                        <div className="boxHeader">

                            <div className="childBoxHeader">

                                <p>
                                    <FontAwesomeIcon
                                        icon={faSignal} />
                                    {/* espace html */}
                                    &nbsp;
                                    {card.level}
                                </p>

                                <p>note globale: {card.averageMark}/5
                                    <FontAwesomeIcon
                                        icon={faStar}
                                    />
                                </p>

                                <p>
                                    <FontAwesomeIcon
                                        icon={faGraduationCap}
                                    />
                                    {` ${card.User.firstname} ${card.User.lastname}`}
                                </p>

                                <p>{card.availability}</p>
                                <p>{card.transmission}</p>
                            </div>

                            <div className="chil2dBoxHeader">
                                <img
                                    className="avatar"
                                    src={`http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/${card.Category.picture}`}
                                    alt="photo des categories"></img>

                                <p className="category">{truncateString(card.Category.name, 11)} {truncateString(card.SubCategory.name, 4)}</p>
                            </div>

                        </div>

                        <div className="boxContent">


                            {/* <p>"{card.User.presentation}"</p> */}



                            <p>"{card.description}"</p>
                        </div>

                        <div className="boxButton">
                            <button className="boxButton1" type="button">Voir profil</button>
                            <button className="boxButton1" type="button">Participer</button>
                        </div>
                    </article >


                ))
                }
            </div>

        </>
    )
}