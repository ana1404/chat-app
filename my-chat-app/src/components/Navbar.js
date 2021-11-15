import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Navbar = (props) => {

  const history = useHistory();

  //izvlačenje definicija iz css-a
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  //otvaranje hamburgera-menua
  const open = () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
  }

  //slanje posljednje poruke prije nego korisnik ode offline
  const lastMsgForOffline = () => {
    props.drone.publish({
      room: props.appProps.log.room,
      message: {
        value: "Offline",
        user: props.appProps.log.name,
        //avatar: props.data1.props.avatar,
      },
    });
    //postavljanje arraya na prazno za trenutnog usera
    props.appProps.setArrOnlineUsers([]);
    setTimeout(()=>{props.drone.close()}, 1000)
    //props.drone.close();
    history.push("/");
  }

  return (
    
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <div>Login</div>
        </li>
        <li className="nav-item">
          <div>About</div>
        </li>
        <li className="nav-item">
          <div onClick={lastMsgForOffline}>Log out</div>
        </li>
      </ul>

      <div className="hamburger" onClick={open}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

    </nav> 
           
    )
}

export default Navbar