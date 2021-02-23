import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import PropTypes from "prop-types";

import "./Messages.css";

import Message from  "./../Message/Message";

const Messages = ({messages, name}) =>(
  <ScrollToBottom>
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
)

export default Messages;


Messages.propTypes = {
  messages: PropTypes.array,
  name: PropTypes.string,
};

Messages.defaultProps = {
  messages: []
};
