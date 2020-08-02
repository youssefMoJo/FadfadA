import React from "react";
import { SmileOutlined, PaperClipOutlined } from "@ant-design/icons";

const inputStyles = {
  width: "85%",
  borderRadius: "20px",
  float: "right",
  resize: "none",
  textAlign: "center",
  outline: "none",
  marginRight: "10px",
  height: "35px",
};
const iconsStyles = {
  display: "inline",
  fontSize: "30px",
  marginLeft: "10px",
  outline: "none",
};

class WritingMessageSec extends React.Component {
  state = {
    message: "",
  };

  handleChange(event) {
    this.setState({ message: event.target.value });
  }
  keypress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props.message(this.state.message);
      this.setState({
        message: "",
      });
    }
  }
  render() {
    return (
      <div>
        <div style={{ marginTop: "10px" }}>
          <form>
            <textarea
              value={this.state.message}
              style={{ ...inputStyles }}
              placeholder="Enter Your Message"
              onChange={(e) => this.handleChange(e)}
              onKeyPress={(e) => this.keypress(e)}
            />
          </form>
          <SmileOutlined style={{ ...iconsStyles }} />
          <PaperClipOutlined style={{ ...iconsStyles }} />
        </div>
      </div>
    );
  }
}

export default WritingMessageSec;
