import React, {useState, useEffect} from 'react'

const drone = new window.Scaledrone('HoTyYGzns5as8t7z');

const room = drone.subscribe('my-room');
const user = "Ana";
const avatar = "#ff0000";

function CloneApp() {

  const [msg, setMsg] = useState([]);
  
  //Connect to room
  useEffect(() => {
    room.on('open', error => {
      if (error) {
        console.error(error);
      } else {
        console.log('Connected to room');
      }
    });

    //ovo je prijašnja fukcija PRIMI
    room.on('message', message => {
      setMsg(preState => {
        return [...preState, message.data];
      });
      //message - (id-poruke, clientId-korisnika, data - objekt koji smo poslali, timestamp - vrijeme)
      console.log(message);
    });
    //ovo je prijašnja fukcija PRIMI
  }, [])


  function posalji(value, user, avatar) {
    //console.log(value)
    drone.publish({
      room: 'my-room',
      message: {
        value: value,
        user: user,
        avatar: avatar
      }
    });
    document.getElementById("input").value = "";
  }

  function diskonekt() {
    console.log("izašao");
    drone.close();
    //room.unsubscribe();   trenutno izbacuje error
  }

  return (
    <>
      <input type="text" id="input" placeholder="Upiši poruku..."></input>
      <button onClick={()=> posalji(document.getElementById("input").value, user, avatar)}>Send</button>
      <button onClick={() => diskonekt()}>Disconnect</button>
      {msg.map((value, index) => {
        return( 
        <div key={index}>
          <span style={{ background: value.avatar }}>{value.user}</span><span>{value.value}</span>
          </div>
        )
      })}
    </>
  );
}

export default CloneApp;
