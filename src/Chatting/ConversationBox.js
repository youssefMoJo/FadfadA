import React from "react";

const conversationBoxStyles = {
  display: "flex",
  flexDirection: "column",
  gridTemplateColumns: "auto",
  gridGap: "10px",
  background: "white",
  height: "700px",
  width: "100%",
  overflow: "auto",
};

class ConversationBox extends React.Component {
  render() {
    return (
      <div style={{ ...conversationBoxStyles }}> {this.props.children}</div>
    );
  }
}

export default ConversationBox;
