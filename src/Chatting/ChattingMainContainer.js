import React from "react";
import ConversationBox from "./ConversationBox";
import WritingMessageSec from "./WritingMessageSec";
import MyMessage from "./MyMessage";
import FriendMessage from "./FriendMessage";
import openSocket from "socket.io-client";
const io = openSocket("http://localhost:5000");

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
    replay: "",
    username: "",
    message: "",
    messages: [],
  };

  componentDidMount() {
    io.on("theMessage", (messagesArr) => {
      this.setState({ messages: [...messagesArr] });
    });
    this.setState(
      {
        username: this.props.name,
      },
      () => {
        io.emit("NewUser", this.state.username);
        io.on("allMessages", (messagesArr) => {
          this.setState({ messages: [...messagesArr] }, () => {});
        });
      }
    );
  }

  presentMessage(mes) {
    this.setState(
      {
        message: mes,
        messages: [
          ...this.state.messages,
          { username: this.state.username, message: mes },
        ],
      },
      () => {
        io.emit("message", this.state.messages);
      }
    );
  }

  render() {
    return (
      <div style={{ ...chattingMainContainerStyles }}>
        <ConversationBox>
          {this.state.messages.map((eachMessage, i) => {
            if (eachMessage.username === this.state.username) {
              return <MyMessage key={i} content={eachMessage.message} />;
            } else {
              return (
                <FriendMessage
                  key={i}
                  name={eachMessage.username}
                  message={eachMessage.message}
                  replay={(name) => this.setState({ replay: name })}
                />
              );
            }
          })}
        </ConversationBox>
        <WritingMessageSec
          replay={this.state.replay}
          message={(mes) => this.presentMessage(mes)}
        ></WritingMessageSec>
      </div>
    );
  }
}

export default ChattingMainContainer;
