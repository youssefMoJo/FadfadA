import React from "react";
import ConversationBox from "./ConversationBox";
import WritingMessageSec from "./WritingMessageSec";
import MyMessage from "./MyMessage";
import FriendMessage from "./FriendMessage";
import openSocket from "socket.io-client";
import OnlineUsers from "../Chatting/OnlineUsers";
import RoomName from "../Chatting/RoomName";
import { Link } from "react-router-dom";
import { createHashHistory } from "history";

const io = openSocket("http://localhost:5000");
const history = createHashHistory();

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
    users: {},
    showUserNames: false,
    isloggedin: false,
  };
  messagesEndRef = React.createRef();

  componentDidMount() {
    this.scrollToBottom();

    io.on("theMessage", (messagesArr) => {
      this.setState({
        messages: [...messagesArr],
      });
    });

    io.on("onlineUsers", (onlineUsers, users) => {
      this.setState({
        onlineUsers: onlineUsers,
        users: users,
      });
    });

    this.setState(
      {
        username: this.props.name,
        isloggedin: true,
      },
      () => {
        io.emit("getOnlineUsers");
        io.emit("gettingAllMessages");
        io.on("allMessages", (messagesArr, users) => {
          this.setState({ messages: [...messagesArr], users: users }, () => {});
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
    io.emit("getOnlineUsers", leave, this.state.username);
    localStorage.removeItem("userOnline");
    localStorage.removeItem("username");
    this.setState({ isloggedin: false });
    history.push("/");
  }

  render() {
    return (
      <div style={{ ...chattingMainContainerStyles }}>
        <RoomName roomName={"Public Room"} />
        <OnlineUsers
          onlineUsers={this.state.onlineUsers}
          users={this.state.users}
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

        <button onClick={() => this.leave()}>Leave</button>
      </div>
    );
  }
}

export default ChattingMainContainer;
