import React, {useEffect, useState} from "react";
import queryString from "query-string";

import "./ViewInformation.css";

const ViewInformation = ({location, users = [], room}) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    const { room } = queryString.parse(location.search);
    if (!users.length) return;
    const list = users.filter(x => x.room.toLowerCase() === room.toLowerCase())
    setListUsers(list);
  }, [users, location.search])

  const onlineIcon = () => (
      <span className="ViewInformation__online-icon"></span>
  )

  return (
    <div className="ViewInformation">
      <div className="ViewInformation__body">
        <div className="ViewInformation__room"> 
            <span className="ViewInformation__room-title"> ROOM: </span>
            <span className="ViewInformation__room-content"> {room} </span>
        </div>
        <div className="ViewInformation__users">
            <span className="ViewInformation__user-title"> USERS: </span>
            <div className="ViewInformation__user-content">
                {listUsers.map((x,idx) => (
                    <span className="ViewInformation__user-item" key={idx}>{onlineIcon()} {x.name}</span>
                ))}
            </div>
        </div>
     </div>
    </div>
  );
};

export default ViewInformation;
