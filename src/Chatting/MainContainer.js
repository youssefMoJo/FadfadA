import React from "react";
import ConversationBoxStyles from "./ConversationBox";
import WritingMessageSec from "./WritingMessageSec";

const MainContainerStyles = {
  display: "grid",
  gridTemplateColumns: "auto",
  gridGap: "10px",
  backgroundColor: "white",
  height: "750px",
  marginTop: "100px",
  width: "700px",
  borderRadius: "30px 30px 0px 0px",
};

class MainContainer extends React.Component {
  render() {
    return (
      <div style={{ ...MainContainerStyles }}>
        <ConversationBoxStyles />
        <WritingMessageSec />
      </div>
    );
  }
}

export default MainContainer;
