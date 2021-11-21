import React from 'react';
import "../style/Popup.css";
import alertImg from "../img/icons8-alert-64.png";

const Popup = (props) => {
  return (
    <div className="modal">
      <div className="modal_content">
        <img alt="alert" className="alert-img" src={alertImg }/>
        <p>Please fill name, avatar and room to enter chat or randomize name, avatar and choose room!</p>
        <button id="btn-popup-ok" onClick={props.closePopUp}>
          Ok
        </button>
      </div>
    </div>
  );
}

export default Popup
