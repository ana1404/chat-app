import React, { useEffect, useState } from "react";
import "../style/Login.css";
import { useHistory } from "react-router"; //importan kako bismo koristili hook za skakanje s putanje na putanju
import Switch from "react-switch"; //toogle button na loginu
import useSound from "use-sound";
import alertSound from "../sounds/case-closed-531.mp3";
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
} from "./Avatar.js";
import Popup from "./Popup";

const arrImgId = [
  "chimmy",
  "starve",
  "cooky",
  "bender",
  "homer",
  "rj",
  "stich",
  "koya",
  "fry",
  "van",
  "leela",
  "superMario",
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
  "Jerry",
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
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Oliver",
  "Ava",
  "William",
  "Sophia",
  "Elijah",
  "Isabella",
  "James",
  "Charlotte",
  "Benjamin",
  "Amelia",
  "Lucas",
  "Mia",
  "Mason",
  "Harper",
  "Ethan",
  "Evelyn",
];

let icon = "none";

const Login = (props) => {
  const history = useHistory();
  const [checked, setChecked] = useState(false); //switch clicked/not clicked
  const [disable, setDisable] = useState(false); //switch disable/enable
  const [avatar, setAvatar] = useState(["noAvatar"]); //arry of avatars za kontrolu koje avatare smo kliknuli 
  const [popupToogle, setPopupToogle] = useState(false);
  const [play] = useSound(alertSound);

  //svaki odabir avatara ili reodabir avatara
  useEffect(() => {
    if (avatar[avatar.length - 1] !== "noAvatar") {
      setDisable(true); 
    }
    if (avatar[avatar.length - 1] === avatar[avatar.length - 2]) {
      setDisable(false); 
      arrImgId.forEach((e) => {
        document.getElementById(e).style.opacity = 1.0;
        setAvatar(["noAvatar"]);
        icon = "none";
      });
    }
  }, [avatar]);

  //postavljanje switcha na true ili false, postavlja avatar i inpt na disable
  useEffect(() => {
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
    if (checked === false) {
      icon = e.target.src;
      setAvatar((pre) => {
        return [...pre, e.target.id];
      });
      checkChosenAvatar(e);
    }
  };

  //pregled koji je avatar odabran i ostale zamagli 
  const checkChosenAvatar = (e) => {
    arrImgId.forEach((i) => {
      if (i !== e.target.id) document.getElementById(i).style.opacity = 0.5;
      else document.getElementById(i).style.opacity = 1.0;
    });
  };

  //zamagljuje avatar ovisno o switchu 
  const disableAvatar = () => {
    arrImgId.forEach((e) => {
      document.getElementById(e).style.opacity = 0.5;
    });
  };
  const enableAvatar = () => {
    arrImgId.forEach((e) => {
      document.getElementById(e).style.opacity = 1.0;
    });
  };

  const randomName = () => {
    return Math.floor(Math.random() * 40);
  };

  const radnomAvatar = () => {
    return Math.floor(Math.random() * 12);
  };

  const playAlert = () => {
    play();
  };

  const handleSubmit = (para) => {
    //submit s podatcima korisnika ovisno je li random korisnik ili korisnik koji je ispunio sve
    para.preventDefault();
    if (
      (document.getElementById("name").value === "" && checked === false) ||
      (document.getElementById("room-select").value === "none" &&
        checked === false) ||
      (icon === "none" && checked === false)
    ) {
      playAlert();
      setPopupToogle(true);
    } else {
      if (checked === false) {
        props.setDrone(
          new window.Scaledrone("HoTyYGzns5as8t7z", {
            data: { name: document.getElementById("name").value },
          })
        );
        props.setLog({
          name: document.getElementById("name").value,
          avatar: icon,
          room: document.getElementById("room-select").value,
        });
        history.push("/room");
      }
      //RANDOM dio popunjavanja
      else {
        if (document.getElementById("room-select").value === "none") {
          playAlert();
          setPopupToogle(true);
        } else {
          let randomUser = randomName();
          props.setDrone(
            new window.Scaledrone("HoTyYGzns5as8t7z", {
              data: { name: arrNames[randomUser] },
            })
          );
          props.setLog({
            name: arrNames[randomUser],
            avatar: arrImgSrc[radnomAvatar()],
            room: document.getElementById("room-select").value,
          });
          history.push("/room");
        }
      }
    }
  };

  const closePopUp = () => {
    setPopupToogle(false);
  };

  return (
    <div className="pozadina" id="pozadina">
      {/* -----------SWITCH--------- */}
      <div className="container-switch-LD">
        <Switch
          id="switchLightDark"
          onColor="#89c"
          offColor="#243b55"
          height={35}
          width={68}
          offHandleColor="#000"
          onHandleColor="#fff"
          handleDiameter={35}
          checked={props.lightDark}
          onChange={() => {
            props.setLightDark(!props.lightDark);
          }}
          uncheckedHandleIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 25,
              }}
            >
              🌛
            </div>
          }
          checkedHandleIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 25,
              }}
            >
              🌞
            </div>
          }
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        />
      </div>
      {/* -----------SWITCH--------- */}

      <form className="form-wraper">
        <h2>Login</h2>
        <div className="form-name">
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            required
            onChange={(e) => {
              e.target.value !== "" ? setDisable(true) : setDisable(false);
            }}
          />
          <label alt="Username" placeholder="Username"></label>
        </div>
        <div className="form-choose-avatar">
          <label htmlFor="avatar">Choose avatar:</label>
        </div>
        <div className="form-group">
          <div id="img-container">
            <img
              src={img1}
              alt="chimmy"
              id="chimmy"
              onClick={(e) => choseAvatar(e)}
            />

            <img
              src={img2}
              alt="starve"
              id="starve"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img3}
              alt="cooky"
              id="cooky"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img4}
              alt="bender"
              id="bender"
              onClick={(e) => choseAvatar(e)}
            />

            <img
              src={img5}
              alt="koya"
              id="koya"
              onClick={(e) => choseAvatar(e)}
            />
            <img src={img6} alt="rj" id="rj" onClick={(e) => choseAvatar(e)} />
            <img
              src={img7}
              alt="stich"
              onClick={(e) => choseAvatar(e)}
              id="stich"
            />

            <img
              src={img8}
              alt="homer"
              onClick={(e) => choseAvatar(e)}
              id="homer"
            />

            <img
              src={img9}
              alt="fry"
              id="fry"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img10}
              alt="van"
              id="van"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img11}
              alt="leela"
              id="leela"
              onClick={(e) => choseAvatar(e)}
            />
            <img
              src={img12}
              alt="superMario"
              id="superMario"
              onClick={(e) => choseAvatar(e)}
            />
          </div>
        </div>

        <div className="form-checkbox">
          {/* -------RANDOM SWITCH--------- */}
          <Switch
            id="switch"
            onColor="#ff4a55"
            offColor="#243b55"
            height={22}
            width={46}
            offHandleColor="#141e30"
            onHandleColor="#141e30"
            handleDiameter={20}
            checked={checked} //state check
            onChange={() => {
              setChecked(!checked);
            }}
            disabled={disable} //state disable
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          />
          {/* -------RANDOM SWITCH--------- */}
          <span>Randomize name and avatar</span>
        </div>
        <select id="room-select" name="room" required>
          <option value="none">Choose room</option>
          <option value="general">General</option>
          <option value="pets">Pets</option>
          <option value="family">Family</option>
          <option value="technology">Technology</option>
        </select>
        <button id="btn-start" type="submit" onClick={(e) => handleSubmit(e)}>
          Start chat
        </button>
      </form>
      {popupToogle ? <Popup closePopUp={closePopUp} /> : null}
    </div>
  );
};
export default Login;
