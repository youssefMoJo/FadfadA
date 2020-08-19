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
  render() {
    return (
      <div style={{ marginLeft: "15px", height: "auto" }}>
        <div
          style={{
            borderRadius: "25px",
            display: "inline",
            float: "left",
            width: "50px",
            height: "50px",
            backgroundColor: "#2059a5",
            textAlign: "center",
            lineHeight: "50px",
          }}
        >
          <b style={{ fontSize: "30px", color: "white" }}>
            {this.props.name.substring(0, 1).toUpperCase()}
          </b>
        </div>

        <div>
          <h3
            style={{
              display: "inline",
              verticalAlign: "bottom",
              color: "#2F80ED",
              marginLeft: "20px",
            }}
          >
            {this.props.name}
          </h3>
          <CommentOutlined style={{ ...iconsStyles }} />
        </div>

        {this.props.message.includes("https") &&
        this.props.message.includes("www") &&
        this.props.message.includes("youtube") ? (
          <a
            style={{ ...FriendMessageStyles }}
            href={this.props.message}
            target="_blank"
          >
            {this.props.message}
          </a>
        ) : (
          <p style={{ ...FriendMessageStyles }}>{this.props.message}</p>
        )}
      </div>
    );
  }
}

export default FriendMessage;
