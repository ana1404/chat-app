import React from "react";

const Rooms = () => {
  return (
    <div className="chat-wraper">
      <div className="chat-header">
        <img
          id="menu-icon"
          src="https://img.icons8.com/bubbles/50/000000/menu.png"
        />
        <h1>
          Welcome in chat room - <span>pets</span>
        </h1>
      </div>
      <div className="onlineMembers-container">
        <span>Online: </span>
        <ul className="ul-members">
          <li className="li-members">
            img <span>name</span>
          </li>
        </ul>
      </div>
      <div className="msg-list">mjesto ispisa poruka</div>
      <div className="chat-input">
        <button>emoji</button>
        <input
          type="text"
          name="text-msg"
          id="text-msg"
          placeholder="Enter your message"
        />
        <button id="btn-send-msg">
          <img src="https://img.icons8.com/windows/32/000000/paper-plane.png" />
        </button>
      </div>
    </div>
  );
};

export default Rooms;
