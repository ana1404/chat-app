import React, { useState, useEffect } from "react";
import "../style/Rooms.css";
import Navbar from "./Navbar";
import Emoji from "./Emoji";
import Spinner from "./Spinner";
import useSound from "use-sound";
import msgSound from "../sounds/pull-out-551.mp3";

const Rooms = (props) => {
  const [msg, setMsg] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [changeRoomTrigger, setChangeRoomTrigger] = useState(false);
  const room = props.drone.subscribe(props.log.room);
  const userInRoom = props.drone.subscribe(`observable-${props.log.room}`);
  const [play] = useSound(msgSound);

  //provjera konekcije i slanje inicijalne poruke
  useEffect(() => {
    room.on("open", (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Connected to room");
        props.drone.publish({
          room: props.log.room,
          message: {
            user: props.log.name,
          },
        });
      }
    });
    //Loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  //odrađuje se nakon promjene sobe
  useEffect(() => {
    if (changeRoomTrigger) {
      props.setUsersOnline([]);
      setMsg([]);
      room.on("open", (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Connected to room");
          props.drone.publish({
            room: props.log.room,
            message: {
              user: props.log.name,
            },
          });
        }
      });
    }
  }, [changeRoomTrigger]);

  //primanje poruka
  useEffect(() => {
    room.on("message", (message) => {
      if (message.data.value !== undefined)
        if (message.clientId !== props.drone.clientId) playMsgSound();

      //spremanje poruka
      setMsg((preState) => {
        return [...preState, message];
      });
    });

    //update scrolla da je uvijek na dnu
    if (!isLoading) updateScroll();

    userInRoom.on("members", (members) => {
      members.forEach((member) => {
        if (member.clientData === undefined) console.log();
        else {
          if (
            props.usersOnline.some((i) =>
              i.name.includes(member.clientData.name)
            )
          )
            console.log();
          else {
            props.setUsersOnline((pre) => {
              return [...pre, { id: member.id, name: member.clientData.name }];
            });
          }
        }
      });
    });

    userInRoom.on("member_leave", (member) => {
      let x = props.usersOnline.filter((a) => {
        if (a.id !== member.id) {
          return a;
        }
      });
      props.setUsersOnline(x);
    });
  });

  const updateScroll = () => {
    let element = document.getElementById("msg-list");
    element.scrollTop = element.scrollHeight;
  };

  //-----slanje poruka-----
  const posalji = (e, value) => {
    if (e.target.id === "btn-send-msg" || e.key === "Enter") {
      if (value !== "") {
        let today = new Date();
        let hour =
          today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
        let minutes =
          today.getMinutes() < 10
            ? `0${today.getMinutes()}`
            : today.getMinutes();
        let time = `${hour}:${minutes}`;

        props.drone.publish({
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
  };

  //resetiranje nakon logouta 
  const removeOnlineUser = () => {
    props.setLog([]);
    props.setUsersOnline([]);
    props.setDrone();
    props.drone.close();
  };

  const playMsgSound = () => {
    play();
  };

  const changeRoom = (room) => {
    props.drone.close();
    props.setDrone(new window.Scaledrone("HoTyYGzns5as8t7z", {
      data: { name: props.log.name },
    }))
    props.setLog({
      name: props.log.name,
      avatar: props.log.avatar,
      room: room,
    });

    setChangeRoomTrigger(true);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="chat-wraper">
      <div className="chat-header">
          <Navbar
            room={props.log.room}
          removeOnlineUser={removeOnlineUser}
          setLightDark={props.setLightDark}
            lightDark={props.lightDark}
            changeRoom={changeRoom}
        />
        <h1>
          Welcome in chat room - <span>{props.log.room}</span>
        </h1>
      </div>
      <div className="onlineMembers-container">
        <ul className="ul-members">
          {
            //ispisivanje svih korisnika koji su online
            props.usersOnline.map((e, i) => {
              return <li key={i}>{`${e.name}`}</li>;
            })
          }
        </ul>
      </div>
      <div id="msg-list">
        {msg.map((data, index) => {
          for (let x in data) {
            return data[x].value === undefined ? null : data[x].user ===
                props.log.name && data.clientId === props.drone.clientId ? (
              <div className="bubbleWrapper" key={index}>
                <div className="inlineContainer own">
                  <img
                    className="inlineIcon"
                    alt="user_avatar_img"
                    src={data[x].avatar}
                  ></img>
                  <div className="ownBubble own">{`${data[x].value}`}</div>
                </div>
                <span className="own">{data[x].time}</span>
              </div>
            ) : (
              <div className="bubbleWrapper" key={index}>
                <div className="inlineContainer">
                  <div className="inlineIcon">
                    <img alt="sender_avatar_img" src={data[x].avatar}></img>
                    <span>{data[x].user}</span>
                  </div>
                  <div className="otherBubble other">{data[x].value}</div>
                </div>
                <span className="other">{data[x].time}</span>
              </div>
            );
          }
        })}
      </div>
      <div className="chat-input">
        <Emoji />
        <input
          type="text"
          name="text-msg"
          id="text-msg"
          placeholder="Enter your message"
          autoComplete="off"
          onKeyPress={(e) => posalji(e, e.target.value)}
        />
        <button
          id="btn-send-msg"
          onClick={(e) => posalji(e, document.getElementById("text-msg").value)}
        ></button>
      </div>
    </div>
  );
};

export default Rooms;
