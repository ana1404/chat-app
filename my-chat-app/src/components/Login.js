import React, { useState } from "react";
import { slika1, slika2, slika3 } from "./Avatar.js";


const Login = () => {

  const izaberiAvatar = (chosenAvatar) => {
    console.log(chosenAvatar.target.src);
  };

  const disableAvatar = (checkBox) => {
      if (checkBox.target.checked === true) {
        console.log("checkbox je kliknut")
      //disable container avatars
        document.getElementById("img-container").hidden = true;
    }
  };

  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  return (
    <form>
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="name"></label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group">
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
              src="https://img.icons8.com/emoji/50/000000/woman-superhero.png"
              alt="woman-superhero"
              id="woman-superhero"
              onClick={(e) => izaberiAvatar(e)}
                      />
           {/*        
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
                      */}  
            <img
              src="https://img.icons8.com/color/48/000000/thor.png"
              alt="thor"
              id="thor"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src="https://img.icons8.com/emoji/48/000000/man-superhero.png"
              alt="man-superhero"
              id="man-superhero"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src="https://img.icons8.com/color/48/000000/deadpool.png"
              alt="deadpool"
              onClick={(e) => izaberiAvatar(e)}
              id="deadpool"
            />
            <img
              src="https://img.icons8.com/color/48/000000/hulk.png"
              alt="hulk"
              onClick={(e) => izaberiAvatar(e)}
              id="hulk"
            />
            <img
              src="https://img.icons8.com/color/48/000000/wonder-woman.png"
              alt="wonder-woman"
              onClick={(e) => izaberiAvatar(e)}
              id="wonder-woman"
            />
            <img
              src="https://img.icons8.com/color/48/000000/black-widow.png"
              alt="black-widow"
              id="black-widow"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src="https://img.icons8.com/doodle/48/000000/iron-man.png"
              alt="iron-man"
              id="iron-man"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src="https://img.icons8.com/color/48/000000/mystique.png"
              alt="mystique"
              id="mystique"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src="https://img.icons8.com/color/48/000000/professor-x.png"
              alt="professor-x"
              id="professor-x"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src="https://img.icons8.com/color/48/000000/groot.png"
              alt="groot"
              id="groot"
              onClick={(e) => izaberiAvatar(e)}
            />
            <img
              src="https://img.icons8.com/color/48/000000/storm-marvel.png"
              alt="storm-marvel"
              id="storm-marvel"
              onClick={(e) => izaberiAvatar(e)}
            />
          </div>
              </div>
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          onChange={(e) => disableAvatar(e)}
              />
              <span>Odaberi random boju umjesto avatara </span>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </form>
  );
};
export default Login;
