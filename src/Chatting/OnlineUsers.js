import React from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

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
        <h1
          style={{
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
            {this.props.userNames.map((user, i) => {
              if (user !== this.props.userName) {
                return <h2 key={i}>{user}</h2>;
              }
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default OnlineUsers;
