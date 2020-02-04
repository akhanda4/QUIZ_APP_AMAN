import React from 'react';
import Tree from "./Tree.jsx";
import Aggrid from "./Aggrid.jsx";
import "../css/quizmaker.css"
const quizmaker = () => {
    return (
        <div className="row">
            <div className="column" >
                <Tree />
            </div>
            <div className="column" >
                <Aggrid />
            </div>
        </div>
    )
}
export default quizmaker;