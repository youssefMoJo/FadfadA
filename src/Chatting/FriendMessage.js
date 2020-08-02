import React from "react";
import {
  CommentOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  PlusCircleTwoTone,
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
  fontSize: "30px",
  marginLeft: "10px",
};

class FriendMessage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h3 style={{ display: "inline" }}>youssef</h3>
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
