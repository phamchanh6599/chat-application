import React from "react";

import './Card.css'

const Card = ({children, heading}) => {

  return (
    <div className="Card">
        <div className="Card__heading"> 
          {heading}
        </div>
        <div className="Card__body">
          {children}
        </div>
    </div>
  );
};

export default Card;

