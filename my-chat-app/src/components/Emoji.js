import Picker from "emoji-picker-react";
import React, { useState, useEffect } from "react";

const Emoji = () => {
  const [emojiOpened, setEmojiOpened] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  

  useEffect(() => {
    if (chosenEmoji !== null) {
      document.getElementById("text-msg").value += chosenEmoji.emoji;
    }
  }, [chosenEmoji]);

  useEffect(() => {
    if (emojiOpened === true) {
      document.getElementById("pick").style.display = "block";
    } else {
      document.getElementById("pick").style.display = "none";
    }
  }, [emojiOpened]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const open = () => {
    if (emojiOpened === true) {
      setEmojiOpened(false);
    } else {
      setEmojiOpened(true);
    }
  };

  return (
    <>
      <button id="emojiBtn" onClick={open}>
      </button>
      <div id="pick" style={{ display: "none" }}>
        <Picker
          onEmojiClick={onEmojiClick}
          native
        />
      </div>
    </>
  );
};

export default Emoji;