import React from "react";
import ConversationBox from "./ConversationBox";
import WritingMessageSec from "./WritingMessageSec";
import MyMessage from "./MyMessage";
import FriendMessage from "./FriendMessage";
import openSocket from "socket.io-client";
import OnlineUsers from "../Chatting/OnlineUsers";
import RoomName from "../Chatting/RoomName";
import { createHashHistory } from "history";
import styled from "styled-components";
import { PoweroffOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

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
  marginLeft: "25%",
  width: "50%",
  borderRadius: "30px 30px 0px 0px",
  float: "left",
};

const ChattingMainContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: auto;
  grid-gap: 10px;
  background-color: white;
  height: 750px;
  margin-top: 100px;
  margin-left: 25%;
  width: 50%;
  border-radius: 30px 30px 0px 0px;
  float: left;
  @media (max-width: 600px) {
    margin-left: 0%;
    margin-top: 50px;
    width: 100%;
    border-radius: 0px;
  }
  @media (max-width: 1000px) {
    margin-left: 0%;
    margin-top: 50px;
    width: 100%;
    border-radius: 0px;
  }
`;

const LeaveButton = styled.button`
  border: 0px solid;
  padding: 5px;
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  height: 70px;
  color: white;
  outline: "none";
  background: linear-gradient(to right, #c31432, #240b36);
  transition: all 0.1s ease-out;

  &:hover {
    font-size: 30px;
  }
`;

class ChattingMainContainer extends React.Component {
  state = {
    username: "",
    message: "",
    messages: [],
    onlineUsers: 0,
    users: {},
    showUserNames: false,
    isloggedin: false,
    sendSomethingPrivate: false,
    sendSomethingPrivateTo: null,
  };
  messagesEndRef = React.createRef();

  componentDidMount() {
    history.push("/chatting");

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
    if (this.state.sendSomethingPrivate) {
      this.setState(
        {
          message: mes,
          messages: [
            ...this.state.messages,
            {
              username: this.state.username,
              message: mes,
              isPrivate: true,
              to: this.state.sendSomethingPrivateTo,
            },
          ],
        },
        () => {
          io.emit("message", this.state.messages);
        }
      );
    } else {
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
  }

  leave() {
    const leave = true;
    io.emit("getOnlineUsers", leave, this.state.username);
    localStorage.removeItem("userOnline");
    localStorage.removeItem("username");
    this.setState({ isloggedin: false });
    history.push("/");
  }

  privateMessage(name) {
    this.setState(
      { sendSomethingPrivate: true, sendSomethingPrivateTo: name },
      () => {
        toast.success("Now You Are In The Private Mode");
      }
    );
  }
  renderingMessages() {
    let result = [];

    for (let i = 0; i < this.state.messages.length; i++) {
      if (this.state.messages[i].username === this.state.username) {
        result.push(
          <MyMessage key={i} message={this.state.messages[i].message} />
        );
      } else if (this.state.messages[i].isPrivate) {
        if (this.state.messages[i].to !== this.state.username) {
          i++;
        } else {
          result.push(
            <FriendMessage
              key={i}
              name={this.state.messages[i].username}
              message={this.state.messages[i].message}
              onClick={(name) => {
                this.privateMessage(name);
              }}
            />
          );
        }
      } else {
        result.push(
          <FriendMessage
            key={i}
            name={this.state.messages[i].username}
            message={this.state.messages[i].message}
            onClick={(name) => {
              this.privateMessage(name);
            }}
          />
        );
      }
    }

    return result;
  }

  backToPublickMode = () => {
    this.setState(
      {
        sendSomethingPrivate: false,
        sendSomethingPrivateTo: null,
      },
      () => {
        toast.success("Now You Are Back To The Public Mode");
      }
    );
  };

  render() {
    return (
      <ChattingMainContainerStyles>
        <RoomName roomName={"Public Room"} />
        <OnlineUsers
          onlineUsers={this.state.onlineUsers}
          users={this.state.users}
          userName={this.state.username}
        />

        <ConversationBox>
          {this.renderingMessages()}
          <div ref={this.messagesEndRef} />
        </ConversationBox>
        <ToastContainer
          position="top-center"
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          autoClose={3000}
        />
        <div
          style={{
            marginLeft: "100px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={this.backToPublickMode}
        >
          {this.state.sendSomethingPrivate ? (
            <div>
              This Is A Private Message To{" "}
              <span
                style={{
                  color: "rgb(47, 128, 237)",
                  fontSize: "18px",
                }}
              >
                {this.state.sendSomethingPrivateTo.charAt(0).toUpperCase() +
                  this.state.sendSomethingPrivateTo.slice(1)}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <WritingMessageSec
          message={(mes) => this.presentMessage(mes)}
        ></WritingMessageSec>

        <LeaveButton onClick={() => this.leave()}>
          Leave <PoweroffOutlined />
        </LeaveButton>
      </ChattingMainContainerStyles>
    );
  }
}

export default ChattingMainContainer;
