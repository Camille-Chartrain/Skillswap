// import { useState, useEffect, useCallback } from "react";
// import Cookies from 'js-cookie';
import CourseStudent from "./courseStudent";
import CourseTeached from "./courseTeached";


const Learning = () => {




    return (
        <main>
            <div className="learning">
                <h2 id="learning">Apprentissage</h2>

                <span className="learning-section">
                    <div className="skillsList">
                        <h3>Apprentissage en cours</h3>
                        <CourseStudent />
                    </div>

                    <div className="skillsList">
                        <h3>Cours dispenses</h3>
                        <CourseTeached />
                    </div>
                </span>

            </div >
        </main >
    )
};
export default Learning;