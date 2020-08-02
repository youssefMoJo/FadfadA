import React from "react";

const myMessageStyles = {
  borderRadius: "35px",
  color: "white",
  border: "solid",
  backgroundColor: "#2F80ED",
  width: "auto",
  maxWidth: "500px",
  padding: "15px",
  float: "right",
  marginRight: "5px",
};

class MyMessage extends React.Component {
  render() {
    return (
      <div style={{ height: "auto" }}>
        <p style={{ ...myMessageStyles }}>{this.props.content}</p>
      </div>
    );
  }
}

export default MyMessage;
