import React from "react";
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faSignal, faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons';
import StarRating from "./StarRating";
// import starSolid from "../../style/icones/starSolid.svg"
// import starRegular from "../../style/icones/starRegular.svg"
// import starHalf from "../../style/icones/starHalf.svg"

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
        return str.slice(0, num) + '(...)';
    };




    return (
        <>
            <div className="advertising">
                {loading && <p className="loading">chargement...</p>}

                {match && dataCards && dataCards.resultCount == 1 && (<p className="search-result">{dataCards.resultCount} résultat</p>)}

                {match && dataCards && dataCards.resultCount > 1 && (<p className="search-result">{dataCards.resultCount} résultats</p>)}

                {noMatch && <p className="search-result">Pas encore de cours pour vos critères, voici nos dernières nouveautés:</p>}
            </div>

            <section className="cards_section">

                <div className="allCards">

                    {dataCards && dataCards.rows && dataCards.rows.length > 0 && dataCards.rows.map((card) => (

                        <article key={card.id} className="card">
                            <div>
                                <h3>{card.title.toUpperCase()}</h3>
                                <div className="starsCatSubCat">
                                    <StarRating
                                        rating={card.averageMark}
                                    />
                                    <p className="category">
                                        {truncateString(card.Category.name, 11)}/
                                        {truncateString(card.SubCategory.name, 4)}
                                    </p>
                                </div>
                                <div className="boxHeader">

                                    <div className="childBoxHeader">
                                        <p>
                                            <FontAwesomeIcon
                                                icon={faSignal}
                                                className=" icone levelIcone"
                                            />
                                            {card.level}
                                        </p>

                                        <p>
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                className="icone userIcone"
                                            />
                                            {`${card.User.firstname} ${card.User.lastname}`}
                                        </p>

                                        <p >
                                            <FontAwesomeIcon
                                                icon={faCalendarDays}
                                                className="icone calendarIcone"
                                            />
                                            {truncateString(card.availability, 13)}
                                        </p>

                                        <p>
                                            <FontAwesomeIcon
                                                icon={faGraduationCap}
                                                className="icone hatIcone"
                                            />
                                            {card.transmission}
                                        </p>
                                    </div>

                                    <div className="chil2dBoxHeader">
                                        <img
                                            className="avatar"
                                            src={`${process.env.REACT_APP_API_URL}/${card.Category.picture}`}
                                            alt="photo des categories"
                                            loading="lazy"
                                        >
                                        </img>
                                    </div>
                                </div>
                            </div>

                            <div className="descrAndButton">
                                <div className="boxContent">
                                    {/* <p>"{card.User.presentation}"</p> */}
                                    <p className="description">"{truncateString(card.description, 170)}"</p>
                                </div>

                                <div className="boxButton">
                                    <button className="boxButton1" type="button">Détails</button>
                                    <button className="boxButton2" type="button">Participer</button>
                                </div>
                            </div>
                        </article >
                    ))
                    }
                </div>
            </section>
        </>
    )
}
