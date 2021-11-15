import React, { useState, useEffect} from "react";
import Navbar from "./Navbar";

const drone = new window.Scaledrone("HoTyYGzns5as8t7z");

const Rooms = (props) => {
/*
    props = {
    log: [{},{}],
    arr: arrayOnlineUser: []
    }
 */

  const [msg, setMsg] = useState([]);
  const room = drone.subscribe(props.log.room);
  var userInRoom = drone.subscribe(`observable-${props.log.room}`);

  //Connect to room
  useEffect(() => {
    //konekcija na room
    //room.on(prvi, drugi)
    room.on("open", (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Connected to room");
      }
    });

    //popunjavamo startno ime unutar arraya osoba online u App.js preko propsa
    props.setArrOnlineUsers(pre => {return [...pre, props.log.name]});

    //slanje inicijalne poruke kako bi druge osobe dobile info da je osoba online
    drone.publish({
      room: props.log.room,
      message: {
        //value: props.log.msg,
        user: props.log.name,
        //avatar: props.log.avatar,
      },
    });
  }, []);

  useEffect(() => {
    //ovo je fukcija PRIMI
    room.on("message", (message) => {
      /* ovaj dio je za popunjavanje arraya osoba online u App.js za usere koji su naknadno došli */
      if (!props.arrOnlineUsers.includes(message.data.user)) {
        props.setArrOnlineUsers(pre=>{return [...pre, message.data.user]})
        //props.arr.arrayOnlineUsers.push(message.data.user);
      }
      /* ovaj dio je ya popunjavanje arraya osoba online u App.js za usere koji su naknadno došli */

      setMsg((preState) => {
        return [...preState, message.data];
      });
      console.log(message)
      //message - (id-poruke, clientId-korisnika, data - objekt koji smo poslali, timestamp - vrijeme)
      
      //userrr.map((e) => console.log(e));
    });
    //ovo je fukcija PRIMI

    //update scrolla da je uvijek na dnu - POZIVANJE
    updateScroll();
    /* userInRoom.on("members", (members)=>{
      console.log(members)
    }) */
    userInRoom.on("member_join", (members)=>{
      console.log(members)
    })
    userInRoom.on("member_leave", (members)=>{
      console.log(members)
    })
  });

  //update scrolla da je uvijek na dnu - DEFINIRANJE
  function updateScroll() {
    let element = document.getElementById("msg-list");
    element.scrollTop = element.scrollHeight;
  }

  //-----slanje poruka-----
  function posalji(e, value) {
    if (e.target.id === "btn-send-msg" || e.key === "Enter")
    {
      if (value !== "") {
        let today = new Date();
        let time = `${today.getHours()}:${today.getMinutes()}`;

        drone.publish({
          room: props.log.room,
          message: {
            value: value,
            user: props.log.name,
            avatar: props.log.avatar,
            time: time,
          },
        });
        document.getElementById("text-msg").value = "";
      }
    }
  }
  //-----slanje poruka-----

  /* const diskonekt = () => {
   console.log("izašao");
   drone.close();
   history.push("/")
    //room.unsubscribe();   trenutno izbacuje error
  } */

  //micanje korisnika s array liste online korisnika iz App.js
  const removeOnlineUser = (para) => {
    let tempArr = [];
    //props.arr.arrayOnlineUsers = props.arr.arrayOnlineUsers.filter(item => item !== para)
    props.setArrOnlineUsers(props.arrOnlineUsers.filter(item => item !== para))
    //-----izbacivanje poruke u kojoj je korisnik otišao online---
    msg.forEach(e => {
      console.log(e)
      if (e.value !== "Offline")
        tempArr.push(e)
    })
    setMsg(tempArr)
    //-----izbacivanje poruke u kojoj je korisnik otišao online---
  }

  return (
    <div className="chat-wraper">
      <div className="chat-header">
        <Navbar appProps={props} drone={drone} room={room }/>
        <h1>
          Welcome in chat room - <span>{props.log.room}</span>
        </h1>
      </div>
      <div className="onlineMembers-container">
        <span>Online: </span>
        <ul className="ul-members">
          { //ispisivanje svih korisnika koji su online
            props.arrOnlineUsers.map((e, i) => {
              return <span key={i}>{`${e}`}</span>;
          })}
        </ul>
      </div>
      <div id="msg-list">
        {//ispisivanje poruka lijevo ili desno ovisno o tome ko je poslao poruku
          msg.map((data, index) => {
            return data.value !== undefined ?
            (
                data.value !== "Offline" ?
                  (
                data.user !== props.log.name ?
                  (
                    <div id="msg-left" key={index}>
                      <img alt="sender_avatar_img" src={data.avatar}></img>
                      <span>{data.user + ": " + data.value}</span>
                      <span>{data.time}</span>
                    </div>
                  ) :
                  (
                    <div id="msg-right" key={index}>
                      <span>{`${data.value}`}</span>
                      <img alt="user_avatar_img" src={data.avatar}></img>
                      <span>{data.time}</span>
                    </div>
                  )
                  ) : (removeOnlineUser(data.user))
            ) :
            (
              console.log()
              );
        })}
      </div>
      <div className="chat-input">
        <div>Emoji</div>
        <input
          type="text"
          name="text-msg"
          id="text-msg"
          placeholder="Enter your message"
          onKeyPress={(e) => posalji(e, e.target.value)}
        />
        <button
          id="btn-send-msg"
          onClick={(e) => posalji(e, document.getElementById("text-msg").value)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Rooms;