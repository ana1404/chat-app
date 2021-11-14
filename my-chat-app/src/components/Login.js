import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Switch from "react-switch";
import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
} from "./Avatar.js";

const arrImgId = [
  "pixelGun",
  "darthVader",
  "anonymous",
  "futurama",
  "homer",
  "ironMan",
  "jetpack",
  "koya",
  "r2",
  "shrek",
  "spongebob",
  "superMario",
  "walterWhite",
  "cheburashka",
];

//pohrana slika u array za randomodabir
const arrImgSrc = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
];

//pohrana random imena za odabir random usera
const arrNames = [
  "Costanza",
  "Frida",
  "Toby",
  "Medo",
  "LongIsland",
  "1337",
  "Kramer",
  "Elaine",
  "Jarry",
  "Gerald",
  "Harald",
  "Colin",
  "Dolly",
  "Bee",
  "Bug",
  "Whizzer",
  "MooMoo",
  "Pixie",
  "Joker",
  "Shadow",
];

let icon = "none";

const Login = (props) => {
  const history = useHistory();
  const [checked, setChecked] = useState(false); //switch clicked/not clicked
  const [disable, setDisable] = useState(false); //switch disable/enable
  const [avatar, setAvatar] = useState(["noAvatar"]); //arry of avatars

  //svaki odabir avatara ili reodabir avatara postavlja avatar ili ga resetira
  useEffect(() => {
    console.log(avatar);
    if (avatar[avatar.length - 1] !== "noAvatar") {
      setDisable(true); //postavlja switch na disable
    }
    if (avatar[avatar.length - 1] === avatar[avatar.length - 2]) {
      setDisable(false); //postavlja switch na enable
      arrImgId.forEach((e) => {
        document.getElementById(e).style.opacity = 1.0;
        setAvatar(["noAvatar"]);
        icon = "none";
      });
    }
  }, [avatar]);

  //postavljanje switcha na true ili false, postavlja avatar i inpt na disable
  useEffect(() => {
    console.log(checked);
    if (checked === true) {
      disableAvatar();
      document.getElementById("name").disabled = true;
    } else {
      enableAvatar();
      document.getElementById("name").disabled = false;
    }
  }, [checked]);

  //odabir avatara klikom
  const choseAvatar = (e) => {
    console.log("odradio");
    if (checked === false) {
      icon = e.target.src;
      setAvatar((pre) => {
        return [...pre, e.target.id];
      });
      //pregled koji je avatar odabran i ostale zamagli POZIV
      checkChosenAvatar(e);
    }
  };

  //pregled koji je avatar odabran i ostale zamagli DEFINICIJA
  const checkChosenAvatar = (avatar) => {
    arrImgId.forEach((i) => {
      if (i !== avatar.target.id)
        document.getElementById(i).style.opacity = 0.5;
      else document.getElementById(i).style.opacity = 1.0;
    });
  };

  //zamagljuje avatar ovisno o switchu u 2. useEffectu
  const disableAvatar = () => {
    arrImgId.forEach((e) => {
      document.getElementById(e).style.opacity = 0.5;
      setChecked(true);
    });
  };
  //vraća avatar na normalnu boju ovisno o switchu u 2. useEffectu
  const enableAvatar = () => {
    arrImgId.forEach((e) => {
      document.getElementById(e).style.opacity = 1.0;
      setChecked(false);
    });
  };

  const randomName = () => {
    return Math.floor(Math.random() * 20);
  };

  const radnomAvatar = () => {
    return Math.floor(Math.random() * 14);
  };

  const handleSubmit = (para) => {
    //submit s podatcima korisnika ovisno je li random korisnik ili korisnik koji je ispunio sve
    para.preventDefault();

    //IFalica za pregled je li sve ispunjeno
    if (
      (document.getElementById("name").value === "" && checked === false) ||
      (document.getElementById("room-select").value === "none" &&
        checked === false) ||
      (icon === "none" && checked === false)
    ) {
      alert("popuni sve potrebno!!");
    } else {
      if (checked === false) {
        props.setLog({
          name: document.getElementById("name").value,
          avatar: icon,
          room: document.getElementById("room-select").value,
          //msg: "Ulogirala se ",
        });
        history.push("/room");
      }
      //RANDOM dio popunjavanja
      else {
        if (document.getElementById("room-select").value === "none")
          alert("izaberi sobu");
        else {
          props.setLog({
            name: arrNames[randomName()],
            avatar: arrImgSrc[radnomAvatar()],
            room: document.getElementById("room-select").value,
           // msg: "Ulogirala se ",
          });
          history.push("/room");
        }
      }
    }
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
          <div id="img-container">
            <img
              src={img1}
              alt="pixelGun"
              id="pixelGun"
              onClick={(e) => choseAvatar(e)}
            />

            <img
              src={img2}
              alt="darthVader"
              id="darthVader"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img3}
              alt="anonymous"
              id="anonymous"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img4}
              alt="futurama"
              id="futurama"
              onClick={(e) => choseAvatar(e)}
            />

            <img
              src={img5}
              alt="homer"
              id="homer"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img6}
              alt="ironMan"
              id="ironMan"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img7}
              alt="jetpack"
              onClick={(e) => choseAvatar(e)}
              id="jetpack"
            />

            <img
              src={img8}
              alt="koya"
              onClick={(e) => choseAvatar(e)}
              id="koya"
            />

            <img src={img9} alt="r2" id="r2" onClick={(e) => choseAvatar(e)} />
            <img
              src={img10}
              alt="shrek"
              id="shrek"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img11}
              alt="spongebob"
              id="spongebob"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img12}
              alt="superMario"
              id="superMario"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img13}
              alt="walterWhite"
              id="walterWhite"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img14}
              alt="cheburashka"
              id="cheburashka"
              onClick={(e) => choseAvatar(e)}
            />
          </div>
        </div>

        <div className="form-checkbox">
          <Switch
            id="switch"
            onColor="#ff4a55"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
            disabled={disable}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          />
          <span>Randomize name and avatar</span>
          <select id="room-select" name="room" required>
            <option value="none">Choose room</option>
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
