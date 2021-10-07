import React, {useState, useEffect} from 'react'

const drone = new window.Scaledrone('HoTyYGzns5as8t7z');

const room = drone.subscribe('my-room');

function App() {

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
    });
    //ovo je prijašnja fukcija PRIMI
  }, [])


  function posalji(value) {
    //console.log(value)
    drone.publish({
      room: 'my-room',
      message: value
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
      <button onClick={()=> posalji(document.getElementById("input").value)}>Send</button>
      <button onClick={() => diskonekt()}>Disconnect</button>
      {msg.map((poruka, index) => { return <p key={index} id={index}>{poruka}</p>})}
    </>
  );
}

export default App;
