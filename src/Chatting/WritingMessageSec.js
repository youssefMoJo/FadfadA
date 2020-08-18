import React from "react";
import { SmileOutlined, PaperClipOutlined } from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const inputStyles = {
  width: "85%",
  borderRadius: "20px",
  float: "right",
  resize: "none",
  textAlign: "center",
  outline: "none",
  marginRight: "10px",
  height: "35px",
  fontSize: "20px",
};
const iconsStyles = {
  display: "inline",
  fontSize: "30px",
  marginLeft: "10px",
  outline: "none",
};
const emojisBox = {
  borderRadius: "50px",
  marginBottom: "10px",
  marginLeft: "20px",
  position: "absolute",
  top: "260px",
};

class WritingMessageSec extends React.Component {
  state = {
    message: "",
    showEmojis: false,
  };

  handleChange(event) {
    this.setState({ message: event.target.value });
  }
  keypress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        this.state.message.includes("https") &&
        this.state.message.includes("www") &&
        this.state.message.includes("youtube")
      ) {
        this.props.message(
          <a href={this.state.message} target="_blank">
            {this.state.message}
          </a>
        );
      } else if (this.state.message.length !== 0) {
        this.props.message(this.state.message);
      }
      // if (this.state.message.length !== 0) {
      //   this.props.message(this.state.message);
      // }
      this.setState({
        message: "",
        showEmojis: false,
      });
    }
  }
  addEmoji = (e) => {
    let emoji = e.native;
    this.setState({
      message: this.state.message + emoji,
    });
  };

  render() {
    return (
      <div style={{ marginTop: "10px", marginBottom: "70px" }}>
        {this.state.showEmojis ? (
          <Picker
            style={{ ...emojisBox }}
            onSelect={(emoji) => this.addEmoji(emoji)}
          />
        ) : (
          ""
        )}

        <form>
          <textarea
            value={this.state.message}
            style={{ ...inputStyles }}
            placeholder="Enter Your Message"
            onChange={(e) => this.handleChange(e)}
            onKeyPress={(e) => this.keypress(e)}
          />
        </form>

        <SmileOutlined
          onClick={() =>
            this.state.showEmojis
              ? this.setState({ showEmojis: false })
              : this.setState({ showEmojis: true })
          }
          style={{ ...iconsStyles }}
        />

        <PaperClipOutlined style={{ ...iconsStyles }} />
      </div>
    );
  }
}

export default WritingMessageSec;
