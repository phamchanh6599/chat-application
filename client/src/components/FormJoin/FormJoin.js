import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import TextInput from "./../../core-components/TextInput/TextInput";
import Button from "./../../core-components/Button/Button";

import "./FormJoin.css";

const FormJoin = () => {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState();
  const [limitPeople, setLimitPeople] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:5000/rooms");
      const result = await response.json();
      setRooms(result);
      if(result.length) {
        setRoom(result[0].name);
        setLimitPeople(result[0].limitPeople);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="FormJoin">
      <div className="FormJoin__container">
        <div className="FormJoin__form">
          <TextInput
            label="User Name"
            id="user"
            value={name || ""}
            placeholder="User Name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="FormJoin__form">
          <select
            className="FormJoin__select"
            onChange={(event) => {
              const { value } = event.target;
              const people = rooms.find((x) => x.name === value).limitPeople;
              const room = value.split(" ").join("_");
              setLimitPeople(people);
              setRoom(room);
            }}
          >
            {rooms.map((x, idx) => {
              return (
                <option value={x.name} key={idx}>
                  {x.name} ----- max: {x.limitPeople}
                </option>
              );
            })}
          </select>
        </div>
        <div className="FormJoin__form-submit">
          <Link
            onClick={(e) =>
              !name || !room || !limitPeople ? e.preventDefault() : null
            }
            to={`/chat?name=${name}&room=${room}&limitPeople=${limitPeople}`}
          >
            <Button variant="primary">JOIN</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormJoin;
