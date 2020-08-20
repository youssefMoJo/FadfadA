import React from "react";
import ConversationBox from "./ConversationBox";
import WritingMessageSec from "./WritingMessageSec";
import MyMessage from "./MyMessage";
import FriendMessage from "./FriendMessage";
import openSocket from "socket.io-client";
import OnlineUsers from "../Chatting/OnlineUsers";
import RoomName from "../Chatting/RoomName";
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
  float: "left",
};

class ChattingMainContainer extends React.Component {
  state = {
    username: "",
    message: "",
    messages: [],
    onlineUsers: 0,
    userNames: [],
    showUserNames: false,
  };
  messagesEndRef = React.createRef();

  componentDidMount() {
    this.scrollToBottom();

    io.on("theMessage", (messagesArr) => {
      this.setState({
        messages: [...messagesArr],
      });
    });

    io.on("onlineUsers", (onlineUsers, userNames) => {
      this.setState({
        onlineUsers: onlineUsers,
        userNames: userNames,
      });
    });

    this.setState(
      {
        username: this.props.name,
      },
      () => {
        io.emit("getOnlineUsers");
        io.emit("gettingAllMessages");
        io.on("allMessages", (messagesArr, userNames) => {
          this.setState(
            { messages: [...messagesArr], userNames: userNames },
            () => {}
          );
        });
      }
    );
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

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

  leave() {
    const leave = true;
    io.emit("getOnlineUsers", leave);
  }

  render() {
    return (
      <div style={{ ...chattingMainContainerStyles }}>
        <RoomName roomName={"Public Room"} />
        <OnlineUsers
          onlineUsers={this.state.onlineUsers}
          userNames={this.state.userNames}
          userName={this.state.username}
        />

        <ConversationBox>
          {this.state.messages.map((eachMessage, i) => {
            if (eachMessage.username === this.state.username) {
              return <MyMessage key={i} message={eachMessage.message} />;
            } else {
              return (
                <FriendMessage
                  key={i}
                  name={eachMessage.username}
                  message={eachMessage.message}
                />
              );
            }
          })}
          <div ref={this.messagesEndRef} />
        </ConversationBox>

        <WritingMessageSec
          message={(mes) => this.presentMessage(mes)}
        ></WritingMessageSec>

        <button onClick={this.leave}>Leave</button>
      </div>
    );
  }
}

export default ChattingMainContainer;
