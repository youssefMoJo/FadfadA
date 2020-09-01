import React from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import styled from "styled-components";

const OnlineUsersLine = styled.div`
  height: 42px;
  background: #2f80ed;
  transition: width 0.5s;
  ${(props) => props.isShowUserNamesModelOpen && " background: green;"}

  width: auto;
`;

const OnlineUsersBox = styled.div`
  position: absolute;
  margin-left: 12.5%;
  background-color: #ffffff;
  width: 25%;
  box-shadow: 5px 5px 5px 5px grey;
  border-radius: 50px;
  text-align: center;
  height: 250px;
  overflow: auto;
  @media (max-width: 600px) {
    width: 50%;
    margin-left: 25%;
  }
  @media (max-width: 1000px) {
    width: 50%;
    margin-left: 25%;
  }
`;

class OnlineUsers extends React.Component {
  state = {
    showUserNames: false,
  };
  showUserNames() {
    if (this.state.showUserNames) {
      this.setState({ showUserNames: false });
    } else {
      this.setState({ showUserNames: true });
    }
  }
  render() {
    return (
      <div>
        {/* HOW MANY ONLINE USER */}
        <OnlineUsersLine isShowUserNamesModelOpen={this.state.showUserNames}>
          <h1
            style={{
              backgroundColor: "white ",
              width: "100%",
              color: "#2F80ED",
              margin: "0px",
              cursor: "pointer",
              textAlign: " center ",
            }}
            onClick={() => this.showUserNames()}
          >
            {this.props.onlineUsers - 1} Online{" "}
            {this.state.showUserNames ? <UpOutlined /> : <DownOutlined />}
          </h1>
        </OnlineUsersLine>

        {/* A LIST OF ALL USER NAMES  */}
        {this.state.showUserNames ? (
          <OnlineUsersBox>
            {Object.values(this.props.users).map((user, i) => {
              if (user.name !== this.props.userName && user.online) {
                return <h2 key={i}>{user.name}</h2>;
              }
              return null;
            })}
          </OnlineUsersBox>
        ) : null}
      </div>
    );
  }
}

export default OnlineUsers;
