import React from "react";
import { SmileOutlined, UploadOutlined } from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputStyles = {
  width: "85%",
  borderRadius: "10px",
  float: "right",
  resize: "none",
  textAlign: "center",
  outline: "none",
  marginRight: "10px",
  height: "50px",
  fontSize: "20px",
  overflow: "auto",
};
const iconsStyles = {
  display: "inline",
  fontSize: "30px",
  marginLeft: "10px",
  outline: "none",
  paddingTop: "10px",
};
const emojisBox = {
  borderRadius: "50px",
  marginBottom: "10px",
  marginLeft: "20px",
  position: "absolute",
  top: "350px",
  outline: "none",
};

class WritingMessageSec extends React.Component {
  state = {
    message: "",
    showEmojis: false,
    loaded: 0,
    image: "",
    readyToSend: false,
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
      onUploadProgress: (ProgressEvent) => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
        });
      },
    };

    formData.append("file", files[0]);

    axios
      .post("http://localhost:5000/upload/imageOrVideo", formData, config)
      .then((res) => {
        if (res.data.success) {
          toast.success("upload success");
          this.setState({ loaded: 0, image: res.data.url, readyToSend: true });
          // this.props.message(res.data.url);
        } else {
          this.setState({ loaded: 0 });
          toast.error("this type is not Allowed !!");
        }
      });
  };

  sendTheFile = () => {
    this.props.message(this.state.image);
    this.setState({ readyToSend: false });
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

        <div style={{ display: "inline-flex" }}>
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div style={{ outline: "none" }} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <UploadOutlined style={{ ...iconsStyles }} />
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <div className="form-group">
          <Progress
            style={{ ...iconsStyles }}
            max="100"
            color="success"
            value={this.state.loaded}
          >
            {Math.round(this.state.loaded, 2)}%
          </Progress>
          <ToastContainer />
          <button onClick={this.sendTheFile} disabled={!this.state.readyToSend}>
            Send It
          </button>
        </div>
      </div>
    );
  }
}

export default WritingMessageSec;
