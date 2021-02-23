import React from "react";
import { Link } from "react-router-dom";

import Card from "./../../core-components/Card/Card";
import FormJoin from "./../FormJoin/FormJoin";
import Button from "./../../core-components/Button/Button";

import "./Join.css";

const Join = () => {
  return (
    <div className="Join">
      <div className="Join__body">
        <Card heading="MUMMIM">
          <FormJoin />
          <div className="Join__back-btn"> 
            <Link to={"/"}>
              <Button variant="primary"> BACK </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Join;
