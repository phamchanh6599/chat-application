import React from "react";
import { Link } from "react-router-dom";

import Card from "./../../core-components/Card/Card";
import Button from "./../../core-components/Button/Button"
import './RoomOption.css'

const RoomOption = () => {

  return (
    <div className="RoomOption">
      <Card heading="WELCOME TO MUMMIM CHAT">
        <div className="RoomOption__container">    
            <Link to={"/new"}> 
                <Button> NEW ROOM </Button>
            </Link>
            <Link to={"/join"}>
            <Button> JOIN ROOM </Button>
                
            </Link>
        </div>
      </Card>
    </div>
  );
};

export default RoomOption;

