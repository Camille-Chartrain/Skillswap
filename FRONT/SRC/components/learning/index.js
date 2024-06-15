// import { useState, useEffect, useCallback } from "react";
// import Cookies from 'js-cookie';
import CourseStudent from "./courseStudent";
import CourseTeached from "./courseTeached";


const Learning = ({ GetMoney }) => {




    return (

        <div className="learning">
            <h2 id="learning">Apprentissage</h2>
            <span className="learning-section">
                <CourseStudent />
                <CourseTeached
                    GetMoney={GetMoney}
                />
            </span>
        </div >

    )
};
export default Learning;