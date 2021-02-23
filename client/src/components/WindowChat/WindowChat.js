import React from "react";

import "./WindowChat.css";

import Messages from "./../Messages/Messages";
import TextInput from "./../../core-components/TextInput/TextInput";
import Button from "./../../core-components/Button/Button";

const WindowChat = ({ sendMessage, setMessage, messages, name, message }) => {
  return (
    <div className="WindowChat">
      <Messages messages={messages} name={name} />
      <div className="WindowChat__input">
        <TextInput
          value={message || ""}
          placeholder="Type message here"
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <Button variant="primary" handleFunc={e => sendMessage(e)}>Send</Button>
      </div>
    </div>
  );
};

export default WindowChat;
