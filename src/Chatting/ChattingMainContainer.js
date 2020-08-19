import React from "react";
import ConversationBox from "./ConversationBox";
import WritingMessageSec from "./WritingMessageSec";
import MyMessage from "./MyMessage";
import FriendMessage from "./FriendMessage";
import openSocket from "socket.io-client";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
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
  showUserNames() {
    if (this.state.showUserNames) {
      this.setState({ showUserNames: false });
    } else {
      this.setState({ showUserNames: true });
    }
  }
  leave() {
    const leave = true;
    io.emit("getOnlineUsers", leave);
  }

  render() {
    return (
      <div style={{ ...chattingMainContainerStyles }}>
        <div>
          <h1
            style={{
              color: "#2F80ED",
              fontSize: "48px",
              margin: "20px",
              fontStyle: "italic",
            }}
          >
            Public Room
          </h1>
          <h1
            style={{
              color: "#2F80ED",
              margin: "0px",
              cursor: "pointer",
              textAlign: " center ",
            }}
            onClick={() => this.showUserNames()}
          >
            {this.state.onlineUsers - 1} Online{" "}
            {this.state.showUserNames ? <UpOutlined /> : <DownOutlined />}
          </h1>
          {this.state.showUserNames ? (
            <div
              style={{
                position: "absolute",
                marginLeft: "240px",
                backgroundColor: "#FFFFFF",
                width: "200px",
                boxShadow: "5px 5px 5px 5px grey",
                borderRadius: "50px",
                textAlign: " center",
                height: "250px",
                overflow: "auto",
              }}
            >
              {this.state.userNames.map((user, i) => {
                if (user !== this.state.username) {
                  return <h2 key={i}>{user}</h2>;
                }
              })}
            </div>
          ) : null}
        </div>

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
