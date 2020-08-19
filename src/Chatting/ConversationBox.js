import React from "react";

const conversationBoxStyles = {
  display: "flex",
  flexDirection: "column",
  gridTemplateColumns: "auto",
  gridGap: "10px",
  background: "linear-gradient(white, #EEEEEE)",
  height: "700px",
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
