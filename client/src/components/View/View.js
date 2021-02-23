import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./View.css";

import WindowChat from "./../WindowChat/WindowChat";
import Card from "./../../core-components/Card/Card";

const ENDPOINT = "localhost:5000";

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

let socket;

const View = ({ location, history }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room, limitPeople } = queryString.parse(location.search);
    console.log("NAME", name, room);
    socket = io.connect(ENDPOINT, connectionOptions);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room, limitPeople }, (error) => {
      if (error) {
        history.push("/");
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="View">
      <div className="View__container">
        <Card heading="MUMMIM"> 
          <WindowChat
            messages={messages}
            message={message}
            name={name}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </Card>
      </div>
    </div>
  );
};

export default View;
