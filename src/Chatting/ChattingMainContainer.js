import React from "react";
import ConversationBox from "./ConversationBox";
import WritingMessageSec from "./WritingMessageSec";
import MyMessage from "./MyMessage";
import FriendMessage from "./FriendMessage";

const chattingMainContainerStyles = {
  display: "grid",
  gridTemplateColumns: "auto",
  gridGap: "10px",
  backgroundColor: "white",
  height: "750px",
  marginTop: "100px",
  width: "700px",
  borderRadius: "30px 30px 0px 0px",
};

class ChattingMainContainer extends React.Component {
  render() {
    return (
      <div style={{ ...chattingMainContainerStyles }}>
        <ConversationBox>
          <MyMessage />
          <FriendMessage />
        </ConversationBox>
        <WritingMessageSec />
      </div>
    );
  }
}

export default ChattingMainContainer;
