import React from "react";

const conversationBoxStyles = {
  display: "flex",
  flexDirection: "column",
  gridTemplateColumns: "auto",
  gridGap: "10px",
  background: "linear-gradient(white, #EEEEEE)",
  marginTop: "120px",
  height: "500px",
  width: "100%",
  overflow: "auto",
};

class ConversationBox extends React.Component {
  render() {
    return (
      <div style={{ ...conversationBoxStyles }}>{this.props.children}</div>
    );
  }
}

export default ConversationBox;
