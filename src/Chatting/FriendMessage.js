import React from "react";
import {
  CommentOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

const FriendMessageStyles = {
  borderRadius: "35px",
  color: "black",
  backgroundColor: "#dbdbdb",
  width: "auto",
  maxWidth: "500px",
  padding: "15px",
  float: "left",
  marginRight: "5px",
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
        <img
          src="bg.png"
          alt={"Girl in a jacket"}
          width="50px"
          height="50px"
          style={{ borderRadius: "25px", display: "inline", float: "left" }}
        ></img>
        <div>
          <h3
            style={{
              display: "inline",
              verticalAlign: "bottom",
              color: "#2F80ED",
              marginLeft: "20px",
            }}
          >
            youssef
          </h3>
          <CommentOutlined style={{ ...iconsStyles }} />
          <UserAddOutlined style={{ ...iconsStyles }} />
        </div>

        <p style={{ ...FriendMessageStyles }}>
          Normally we start with the JSX syntax in React to render some output
          to the browser. Essentially, JSX is a mix of HTML and JavaScript and
          tries to get the best out of both these languages.
        </p>
      </div>
    );
  }
}

export default FriendMessage;
