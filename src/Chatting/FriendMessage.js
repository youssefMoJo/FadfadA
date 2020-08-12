import React from "react";
import { CommentOutlined } from "@ant-design/icons";

const FriendMessageStyles = {
  borderRadius: "35px",
  color: "black",
  backgroundColor: "#dbdbdb",
  width: "auto",
  maxWidth: "500px",
  padding: "15px",
  float: "left",
  marginRight: "5px",
  fontSize: "25px",
};
const iconsStyles = {
  display: "inline",
  fontSize: "25px",
  color: "#2F80ED",
  marginLeft: "10px",
  outline: "none",
};

class FriendMessage extends React.Component {
  replay(name) {
    this.props.replay(name);
  }
  render() {
    return (
      <div style={{ marginLeft: "15px", height: "auto" }}>
        <img
          src="bg.png"
          alt={""}
          width="50px"
          height="50px"
          style={{ borderRadius: "25px", display: "inline", float: "left" }}
        ></img>
        <div>
          {/* <a href="#"> */}
          <h3
            style={{
              display: "inline",
              verticalAlign: "bottom",
              color: "#2F80ED",
              marginLeft: "20px",
            }}
            onClick={() => this.replay(this.props.name)}
          >
            {this.props.name}
          </h3>
          {/* </a> */}
          <CommentOutlined style={{ ...iconsStyles }} />
        </div>

        <p style={{ ...FriendMessageStyles }}>{this.props.message}</p>
      </div>
    );
  }
}

export default FriendMessage;
