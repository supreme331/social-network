import preloader from "../../../assets/img/Spin.svg";
import React from "react";

let Preloader = (props) => {
    return <div style={ {backgroundColor: 'white'} }>
        <img src={preloader} alt="preloader"/></div>
}

export default Preloader;