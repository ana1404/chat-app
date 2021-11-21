import React, {useState, useEffect} from "react";
import "../style/Navbar.css";
import { useHistory } from "react-router";
import Switch from "react-switch";

const Navbar = (props) => {
  const history = useHistory();

  //otvaranje hamburgera-menua
  const open = () => {
    document.getElementById("hamburger").classList.toggle("active");
    document.getElementById("nav-menu").classList.toggle("active");
  };

  //korisnik ide offline
  const logout = () => {
    props.removeOnlineUser();
    history.push("/");
  };

  const openRoomSelection = () => {
    if(props.room !== "general")
      document.getElementById("nav-general").style.display = "flex";
    if(props.room !== "pets")
      document.getElementById("nav-pets").style.display = "flex";
    if (props.room !== "family")
      document.getElementById("nav-family").style.display = "flex";
    if (props.room !== "technology")
      document.getElementById("nav-technology").style.display = "flex";
  };

  const switchRoom = (e) => {
    props.changeRoom(e.target.value)
  }

  return (
    <nav className="navbar">
      <ul id="nav-menu" className="nav-menu">
        <li className="nav-item">
          <span className="nav-bar-switch">
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
          </span>
        </li>
        <li className="nav-item">
         <div onClick={openRoomSelection}>Change Room</div> 
        </li>
        <option className="nav-item" id="nav-general" value="general" onClick={(e)=>switchRoom(e)} style={{display:"none"}}>General</option>
        <option className="nav-item" id="nav-pets" value="pets" onClick={(e)=>switchRoom(e)} style={{display:"none"}}>Pets</option>
        <option className="nav-item" id="nav-family" value="family" onClick={(e)=>switchRoom(e)} style={{display:"none"}}>Family</option>
        <option className="nav-item" id="nav-technology" value="technology" onClick={(e)=>switchRoom(e)} style={{display:"none"}}>Technology</option>
        <li className="nav-item" className="nav-item">
          <div onClick={logout}>Log out</div>
        </li>
      </ul>

      <div id="hamburger" className="hamburger" onClick={open}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
