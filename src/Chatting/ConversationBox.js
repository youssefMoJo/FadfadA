import React from "react";

const ConversationBoxStyles = {
  display: "grid",
  gridTemplateColumns: "auto",
  gridGap: "10px",
  backgroundColor: "#EEEEEE",
  marginTop: "150px",
  height: "500px",
  width: "100%",
};

class ConversationBox extends React.Component {
  render() {
    return <div style={{ ...ConversationBoxStyles }}></div>;
  }
}

export default ConversationBox;
