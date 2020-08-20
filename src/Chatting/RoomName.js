import React from "react";

class RoomName extends React.Component {
  render() {
    return (
      <div>
        <h1
          style={{
            color: "#2F80ED",
            fontSize: "48px",
            margin: "20px",
            fontStyle: "italic",
          }}
        >
          {this.props.roomName}
        </h1>
      </div>
    );
  }
}

export default RoomName;
