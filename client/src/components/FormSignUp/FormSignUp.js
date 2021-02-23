import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

import TextInput from "./../../core-components/TextInput/TextInput";
import Button from "./../../core-components/Button/Button";

import "./FormSignUp.css";

const URL = "http://localhost:5000";

const FormSignUp = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [limitPeople, setLimitPeople] = useState(null);
  const [required, setRequired] = useState("");

  const isDuplicateRoom = async (room) => {
    const fetchRooms = async () => {
      const response = await fetch(`${URL}/rooms`);
      const result = await response.json();
      return result;
    };
    const listRooms = await fetchRooms();
    const r = listRooms.find((x) => x.name === room);
    return !!r;
  };

  const addRoom = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const handleAddRoom = useCallback(async () => {
    if (!name || !room || !limitPeople) {
      setRequired("Plese fill the form");
      return;
    }
    const isDuplicate = await isDuplicateRoom(room);
    if (isDuplicate) return;
    const id = "_" + Math.random().toString(36).substr(2, 9);

    try {
      await addRoom(`${URL}/room`, {
        id,
        name: room,
        limitPeople,
      });
    } catch (err) {
      console.error("ERROR: ", err);
    } finally {
      setLimitPeople("")
      setName("")
      setRoom("")
      setRequired("")
    }
  }, [limitPeople, room, name]);

  return (
    <div className="FormSignUp">
      <div className="FormSignUp__form">
        <TextInput
          label="User Name"
          id="userName"
          placeholder="User Name"
          value={name || ""}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="FormSignUp__form">
        <TextInput
          label="Room Name"
          id="room"
          value={room || ""}
          placeholder="Room Name"
          onChange={(event) => setRoom(event.target.value)}
        />
      </div>
      <div className="FormSignUp__form">
        <TextInput
          label="Limit People"
          id="people"
          value={limitPeople || ""}
          placeholder="Limit People"
          onChange={(event) => setLimitPeople(event.target.value)}
        />
      </div>
      <div className="FormSignUp__form-submit">
        <Link
            onClick={(e) => (!name || !room || !limitPeople ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}&limitPeople=${limitPeople}`}
          >
          <Button variant="primary" handleFunc={handleAddRoom}>
            New
          </Button>
        </Link>
        <span className="FormSignUp__message-error"> {required} </span>
      </div>
    </div>
  );
};

export default FormSignUp;
