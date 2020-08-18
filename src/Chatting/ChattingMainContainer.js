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
    username: "",
    message: "",
    messages: [],
    onlineUsers: 0,
  };
  messagesEndRef = React.createRef();

  componentDidMount() {
    this.scrollToBottom();

    io.on("theMessage", (messagesArr) => {
      this.setState({
        messages: [...messagesArr],
      });
    });

    io.on("onlineUsers", (onlineUsers) => {
      this.setState({
        onlineUsers: onlineUsers,
      });
    });

    this.setState(
      {
        username: this.props.name,
      },
      () => {
        io.emit("getOnlineUsers");
        io.emit("gettingAllMessages");
        io.on("allMessages", (messagesArr) => {
          this.setState({ messages: [...messagesArr] }, () => {});
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
        <h1>{this.state.onlineUsers}</h1>
        <ConversationBox>
          {this.state.messages.map((eachMessage, i) => {
            if (eachMessage.username === this.state.username) {
              console.log(eachMessage);
              return <MyMessage key={i} content={eachMessage.message} />;
            } else {
              return (
                <FriendMessage
                  key={i}
                  name={eachMessage.username}
                  message={eachMessage.message}
                />
              );
              // if (typeof eachMessage.message === "object") {
              //   return (
              //     <FriendMessage
              //       key={i}
              //       name={eachMessage.username}
              //       message={
              //         <a href={eachMessage.message.props.href} target="_blank">
              //           {eachMessage.message.props.href}
              //         </a>
              //       }
              //     />
              //   );
              // } else {
              //   console.log("2");
              //   return (
              //     <FriendMessage
              //       key={i}
              //       name={eachMessage.username}
              //       message={eachMessage.message}
              //     />
              //   );
            }
          })}
          <div ref={this.messagesEndRef} />
        </ConversationBox>

        <WritingMessageSec
          message={(mes) => this.presentMessage(mes)}
        ></WritingMessageSec>

        {/* <span
          style={{ cursor: "pointer" }}
          onClick={() =>
            window.open("https://www.youtube.com/watch?v=hQncT4Hswhw")
          }
        >
          Software to Make Your Website Work
        </span> */}

        <button onClick={this.leave}>Leave</button>
      </div>
    );
  }
}

export default ChattingMainContainer;
