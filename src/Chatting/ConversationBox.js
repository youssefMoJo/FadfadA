import React from "react";

const ConversationBoxStyles = {
  display: "grid",
  gridTemplateColumns: "auto",
  gridGap: "10px",
  backgroundColor: "#EEEEEE",
  marginTop: "120px",
  height: "500px",
  width: "100%",
  overflow: "auto",
};

class ConversationBox extends React.Component {
  render() {
    return <div style={{ ...ConversationBoxStyles }}></div>;
  }
}

export default ConversationBox;
