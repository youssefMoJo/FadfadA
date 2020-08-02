import React from "react";
import ConversationBox from "./ConversationBox";
import WritingMessageSec from "./WritingMessageSec";
import MyMessage from "./MyMessage";
import FriendMessage from "./FriendMessage";

const chattingMainContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gridTemplateColumns: "auto",
  gridGap: "10px",
  backgroundColor: "white",
  height: "750px",
  marginTop: "100px",
  width: "700px",
  borderRadius: "30px 30px 0px 0px",
};

class ChattingMainContainer extends React.Component {
  state = {
    myMessages: [],
  };

  presentMessage(mes) {
    const myMessage = [];
    myMessage.unshift(mes);
    this.setState({
      myMessages: [...this.state.myMessages, mes],
    });
  }
  render() {
    let message = [];
    let getTheMessage = this.state.myMessages.forEach((mes, i) => {
      return message.push(<MyMessage content={mes} key={i} />);
    });

    return (
      <div style={{ ...chattingMainContainerStyles }}>
        <ConversationBox>
          {message}
          <FriendMessage />
        </ConversationBox>

        <WritingMessageSec message={(mes) => this.presentMessage(mes)} />
      </div>
    );
  }
}

export default ChattingMainContainer;
