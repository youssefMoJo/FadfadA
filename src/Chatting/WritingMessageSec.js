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
  marginLeft: "5px",
  outline: "none",
  paddingTop: "10px",
  cursor: "pointer",
};

const EmojisBox = styled.div`
  border-radius: 50px;
  width: 30px;
  margin-bottom: 10px;
  margin-left: 10px;
  position: absolute;
  top: 300px;
  outline: none;
  @media (max-width: 1000px) {
    top: ${(props) => (props.showEmojis ? "240px" : "240px")};
  }
`;
const InputStyles = styled.textarea`
  border-radius: 150px;
  resize: none;
  outline: none;
  font-size: 15px;
  over-flow: auto;
  padding: 10px 0px 0px 25px;
  margin-left: 20px;

  width: ${(props) => (props.widthAdjusting ? "60%" : "80%")};

  @media (max-width: 1554px) {
    width: ${(props) => (props.widthAdjusting ? "50%" : "80%")};
  }
  @media (max-width: 1255px) {
    width: ${(props) => (props.widthAdjusting ? "40%" : "80%")};
  }
  @media (max-width: 1050px) {
    width: ${(props) => (props.widthAdjusting ? "30%" : "80%")};
  }
  @media (max-width: 1000px) {
    width: ${(props) => (props.widthAdjusting ? "60%" : "80%")};
  }
  @media (max-width: 790px) {
    width: ${(props) => (props.widthAdjusting ? "50%" : "80%")};
  }
  @media (max-width: 730px) {
    width: ${(props) => (props.widthAdjusting ? "40%" : "80%")};
  }
  @media (max-width: 530px) {
    width: ${(props) => (props.widthAdjusting ? "30%" : "80%")};
  }
  @media (max-width: 460px) {
    width: ${(props) => (props.widthAdjusting ? "20%" : "80%")};
  }
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
    hover: false,
  };

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  sendMessage = () => {
    if (this.state.message.length !== 0) {
      this.props.message(this.state.message);
    }
    this.setState({
      message: "",
      showEmojis: false,
      hover: false,
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
      .post("http://172.31.42.51:5000/upload/imageOrVideo", formData, config)
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

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          backgroundColor: "white",
          padding: "10px 0px 10px 0px",
          height: "50px",
        }}
      >
        {/* -------------------------------------------------------------------------------- */}
        {/* this is for the emojis box  */}
        {this.state.showEmojis ? (
          <EmojisBox>
            <Picker
              style={{ borderRadius: "50px" }}
              showEmojis={this.state.showEmojis}
              onSelect={(emoji) => this.addEmoji(emoji)}
              theme="dark"
            />
          </EmojisBox>
        ) : (
            ""
          )}
        {/* -------------------------------------------------------------------------------- */}
        {/* this is the icon to show the emojis box */}
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
        {/* -------------------------------------------------------------------------------- */}
        {/* this is the icon for uploading  */}
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
                  }}
                />
              </div>
            </section>
          )}
        </Dropzone>
        {/* -------------------------------------------------------------------------------- */}
        {/* this is the send icon to send the file you uploaded */}
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
                // large={require(`./bg.png`)}
                alt="Preview"
              />
            </div>
          </div>
        ) : null}
        {/* -------------------------------------------------------------------------------- */}
        {/* this is the message input */}
        <InputStyles
          widthAdjusting={this.state.readyToSend}
          id={"myText"}
          value={this.state.message}
          placeholder="Enter Your Message"
          onChange={(e) => this.handleChange(e)}
          onKeyPress={(e) => this.keypress(e)}
        />
        {/* -------------------------------------------------------------------------------- */}
        {/* this is the send icon to send the message */}
        {this.state.message.length !== 0 ? (
          <div
            style={{
              ...iconsStyles,
              backgroundColor: this.state.hover ? "rgb(47, 128, 237)" : "",
              color: this.state.hover ? "white" : "",
              borderRadius: this.state.hover ? "150px" : "120px",
              padding: this.state.hover ? "10x" : "10px",
              marginLeft: "5px",
            }}
          >
            <SendOutlined
              onClick={this.sendMessage}
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
            />
          </div>
        ) : null}
        {/* -------------------------------------------------------------------------------- */}
        {/* this is notification or alert component */}
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
