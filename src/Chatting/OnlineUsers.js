import React from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import styled from "styled-components";

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
    const Rotate = styled.div`
      width: 100px;
      height: 42px;
      background: #2f80ed;
      transition: width 0.5s;
      ${(props) =>
        (props.isShowUserNamesModelOpen &&
          "width: 100%;  background: green;") ||
        (!props.isShowUserNamesModelOpen && "width: 100px;")}

      &:active {
        width: ${(props) =>
          props.isShowUserNamesModelOpen ? "100px" : " 100%"};
      }
    `;

    return (
      <div>
        {/* HOW MANY ONLINE USER */}
        <Rotate isShowUserNamesModelOpen={this.state.showUserNames}>
          <h1
            style={{
              backgroundColor: "white",
              width: "700px",
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
        </Rotate>

        {/* A LIST OF ALL USER NAMES  */}
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
            {Object.values(this.props.users).map((user, i) => {
              if (user.name !== this.props.userName && user.online) {
                return <h2 key={i}>{user.name}</h2>;
              }
              return null;
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default OnlineUsers;
