import React from "react";
import { UploadOutlined, SmileOutlined, SendOutlined } from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Dropzone from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import ModalImage from "react-modal-image";

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
  top: "315px",
  outline: "none",
};
const InputStyles = styled.textarea`
  border-radius: 150px;

  resize: none;
  outline: none;
  font-size: 15px;
  over-flow: auto;
  padding: 10px 0px 0px 25px;
  margin-left: 10px;
`;

const SendFilesButton = styled.button`
  border: 1px solid;
  border-radius: 150px;
  padding: 10px;
  margin-left: 6px;
  font-size: 10px;
  outline: none;
  height: 48px;
  width: 60px;
  color: green;
  cursor: pointer;
  &:hover {
    color: white;
    background: linear-gradient(to right, #093028, #237a57);
  }
`;

class WritingMessageSec extends React.Component {
  state = {
    message: "",
    showEmojis: false,
    image: "",
    readyToSend: false,
  };

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  sendMessage = () => {
    this.props.message(this.state.message);
    this.setState({
      message: "",
      showEmojis: false,
    });
  };

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
    this.setState(
      {
        message: this.state.message + emoji,
      },
      () => {
        document.getElementById("myText").focus();
      }
    );
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
          toast.success("upload success");
          this.setState({
            image: res.data.url,
            readyToSend: true,
          });
        } else {
          toast.error("this type of file is not Allowed!!");
        }
      });
  };

  sendTheFile = () => {
    this.props.message(this.state.image);
    this.setState({
      readyToSend: false,
    });
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        {this.state.showEmojis ? (
          <Picker
            style={{ ...emojisBox }}
            onSelect={(emoji) => this.addEmoji(emoji)}
          />
        ) : (
          ""
        )}

        <SmileOutlined
          onClick={() =>
            this.state.showEmojis
              ? this.setState({ showEmojis: false })
              : this.setState({ showEmojis: true })
          }
          style={{
            ...iconsStyles,
            color: this.state.showEmojis ? "#4c94f5" : "black",
          }}
        />

        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                style={{ outline: "none", paddingTop: "10px" }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <UploadOutlined
                  style={{
                    ...iconsStyles,
                    cursor: "pointer",
                  }}
                />
              </div>
            </section>
          )}
        </Dropzone>

        {this.state.readyToSend ? (
          <div>
            <SendFilesButton onClick={this.sendTheFile}>Send</SendFilesButton>
            <div
              style={{
                height: "48px",
                width: "60px",
                float: "right",
                marginTop: "9px",
                marginLeft: "10px",
              }}
            >
              <ModalImage
                large={require(`.././uploads/${this.state.image.substring(
                  12,
                  this.state.image.length
                )}`)}
                // small={require(`.././uploads/${this.state.image.substring(
                //   12,
                //   this.state.image.length
                // )}`)}
                alt="Preview"
              />
            </div>
          </div>
        ) : null}

        <form>
          <InputStyles
            style={{ width: this.state.readyToSend ? "400px" : "530px" }}
            id={"myText"}
            value={this.state.message}
            placeholder="Enter Your Message"
            onChange={(e) => this.handleChange(e)}
            onKeyPress={(e) => this.keypress(e)}
          />
        </form>

        <SendOutlined
          style={{
            ...iconsStyles,
          }}
          onClick={this.sendMessage}
        />

        <ToastContainer
          position="top-center"
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          autoClose={3000}
        />
      </div>
    );
  }
}

export default WritingMessageSec;
