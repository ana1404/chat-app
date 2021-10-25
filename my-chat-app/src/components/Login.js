import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  img1,
  slika1,
  slika10,
  slika11,
  slika2,
  slika3,
  slika4,
  slika5,
  slika6,
  slika7,
  slika8,
  slika9,
} from "./Avatar.js";

const Login = (props) => {

    const history = useHistory();
    let icon = "noAvatar"


  const izaberiAvatar = (chosenAvatar) => {
    console.log(chosenAvatar);
      icon = chosenAvatar.target.src;
  };

  const disableAvatar = (checkBox) => {
    if (checkBox.target.checked === true) {
      console.log("checkbox je kliknut");
      //disable container avatars
      document.getElementById("img-container").hidden = true;
    }
  };

  const handleSubmit = (para) => {
    //console.log("handleSubmit");
      para.preventDefault();
      props.setData({
          name: document.getElementById("name").value,
          avatar: icon,
          room: document.getElementById("room-select").value
      });
      history.push("/room");
  };

  return (
    <div className="pozadina">
      <form className="form-wraper">
        <h2>Login</h2>
        <div className="form-name">
          <label htmlFor="name"></label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-choose-avatar">
          <label htmlFor="avatar">Choose avatar:</label>
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            hidden
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <div id="img-container">
            <img
              src={img1}
              alt="woman-superhero"
              id="woman-superhero"
              onClick={(e) => izaberiAvatar(e)}
            />

            <img
              src={slika1}
              alt="capten-superhero"
              id="capten-superhero"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src={slika2}
              alt="widow"
              id="widow"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src={slika3}
              alt="hulk"
              id="hulk"
              onClick={(e) => izaberiAvatar(e)}
            />

            <img
              src={slika5}
              alt="thor"
              id="thor"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src={slika6}
              alt="man-superhero"
              id="man-superhero"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src={slika7}
              alt="deadpool"
              onClick={(e) => izaberiAvatar(e)}
              id="deadpool"
            />

            <img
              src={slika8}
              alt="wonder-woman"
              onClick={(e) => izaberiAvatar(e)}
              id="wonder-woman"
            />

            <img
              src={slika9}
              alt="iron-man"
              id="iron-man"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src={slika10}
              alt="mystique"
              id="mystique"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src={slika11}
              alt="professor-x"
              id="professor-x"
              onClick={(e) => izaberiAvatar(e)}
            />
          </div>
        </div>

        <div className="form-checkbox">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            onChange={(e) => disableAvatar(e)}
          />
          <span>Randomize name and color</span>
          <select id="room-select" name="room" required>
            <option value>Choose room</option>
            <option value="general">General</option>
            <option value="pets">Pets</option>
            <option value="family">Family</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <button id="btn-start" type="submit" onClick={(e) => handleSubmit(e)}>
          Start chat
        </button>
      </form>
    </div>
  );
};
export default Login;
