import React from "react";
import { Link } from "react-router-dom";

import Card from "./../../core-components/Card/Card";
import FormSignUp from "./../FormSignUp/FormSignUp";
import Button from "./../../core-components/Button/Button";

import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="SignUp">
      <div className="SignUp__body">
        <Card heading="MUMMIM">
          <FormSignUp />
          <div className="SignUp__back-btn"> 
            <Link to={"/"}>
              <Button variant="primary"> BACK </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
