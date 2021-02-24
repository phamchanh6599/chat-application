import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./View.css";

import WindowChat from "./../WindowChat/WindowChat";
import Card from "./../../core-components/Card/Card";
import ViewInformation from "./../ViewInformation/ViewInformation";

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
    const { name, room } = queryString.parse(location.search);
    socket = io.connect(ENDPOINT, connectionOptions);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        history.push("/");
        alert(error);
      }
    });

  }, [location.search, history]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const dateTime = () => {
    const today = new Date();
    const time = today.getHours() + ":" +  ('0'+ today.getMinutes()).slice(-2);
    return time
  }

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, dateTime(), () => setMessage(""));
    }
  };

  const LeftRoom = () => {
    history.push("/")
    socket.disconnect();
  }

  return (
    <div className="View">
      <div className="View__container">
        <Card heading="MUMMIM" handleFunc={LeftRoom}>
          <WindowChat
            messages={messages}
            message={message}
            name={name}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </Card>
        <ViewInformation location={location} users={users} room={room} />
      </div>
    </div>
  );
};

export default View;
