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
  fontSize: "25px",
};

class MyMessage extends React.Component {
  render() {
    return (
      <div>
        {this.props.content.includes("https") &&
        this.props.content.includes("www") &&
        this.props.content.includes("youtube") ? (
          <a
            style={{ ...myMessageStyles }}
            href={this.props.content}
            target="_blank"
          >
            {this.props.content}
          </a>
        ) : (
          <p style={{ ...myMessageStyles }}>{this.props.content}</p>
        )}
      </div>
    );
  }
}

export default MyMessage;
