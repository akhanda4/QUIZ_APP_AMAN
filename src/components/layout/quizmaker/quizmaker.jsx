import React from 'react';
import Tree from "./Tree.jsx";
import Aggrid from "./Aggrid.jsx";
import "../../../public/css/quizmaker.css";
import Auxiliary from '../../auxillary/Auxillary.jsx';
import Logout from "../logout.jsx";

const quizmaker = (props) => {
    return (
        <Auxiliary>
            <Logout authenticated={props.authenticated} />{/*//TODO:*/}
            <div className="row">
                <div className="column" >
                    <Tree />
                </div>
                <div className="column" >
                    <Aggrid />
                </div>
            </div>
        </Auxiliary>
    )
}
export default quizmaker;