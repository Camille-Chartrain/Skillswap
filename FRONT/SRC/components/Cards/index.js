import React from "react";

export default function Cards({
    dataCards,
    match,
    noMatch,
    loading
}) {
    console.log("dataCards", dataCards);



    return (
        <>
            {loading && <p>chargement...</p>}
            {dataCards.rows && dataCards.rows.length > 0 && dataCards.rows.map((card) => (
                <article key={card.id} className="card">
                    <p>{card.title}</p>
                    <p>{card.User.grade_level}</p>
                    <p>{card.level}</p>
                    <p>{card.description}</p>
                    <p>{card.Category.name}</p>
                    <p>{card.SubCategory.name}</p>

                    <p>{card.availability}</p>

                    <p>{card.transmission}</p>
                    <p>SKILLSWAPEUR:{`${card.User.firstname} ${card.User.lastname}`}</p>
                    <p>"{card.User.presentation}"</p>
                    <p>Contact: {card.User.email}</p>
                </article>
            ))}

        </>
    )
}