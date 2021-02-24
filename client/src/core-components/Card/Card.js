import React from "react";
import PropTypes from "prop-types";

import './Card.css'

const Card = ({children, heading, handleFunc}) => {

  return (
    <div className="Card">
        {handleFunc ? (
          <div className="Card__heading Card__heading-with-close"> 
              <span> {heading}</span>
              <span className="Card__heading-close-icon" onClick={handleFunc}>X</span>
          </div>
        ) : <div className="Card__heading Card__heading-no-close"> 
          {heading}
        </div>}
        <div className="Card__body">
          {children}
        </div>
    </div>
  );
};

export default Card;


Card.propTypes = {
  handleFunc: PropTypes.func
};


