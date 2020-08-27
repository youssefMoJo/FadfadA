import React from "react";
import { SmileOutlined, UploadOutlined } from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Dropzone from "react-dropzone";
import axios from "axios";

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
  top: "350px",
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
      if (this.state.message.length !== 0) {
        this.props.message(this.state.message);
      }
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
  onDrop = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    axios
      .post("http://localhost:5000/upload/imageOrVideo", formData, config)
      .then((res) => {
        if (res.data.success) {
          this.props.message(res.data.url);
        } else {
          this.props.message("noo");
        }
      });
  };

  render() {
    return (
      <div>
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

        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <UploadOutlined style={{ ...iconsStyles }} />
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default WritingMessageSec;
