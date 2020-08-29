import React from "react";
import { UploadOutlined, SmileOutlined } from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { css } from "styled-components";

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
  top: "270px",
  outline: "none",
};

const SendFilesButton = styled.button`
  border: 1px solid;
  border-radius: 10px;
  padding: 5px;
  margin-left: 6px;
  font-size: 15px;
  ${(props) =>
    props.disabled
      ? css`
          color: #d81052;
          cursor: not-allowed;
          opacity: 0.6;
        `
      : css`
          color: green;
          cursor: pointer;
          transition: all 0.4s linear;
          margin-left: 83%;
          &:hover {
            color: white;
            background: linear-gradient(to right, #093028, #237a57);
          }
        `};
`;

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
    console.log("object");
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
          this.setState({
            image: res.data.url,
            readyToSend: true,
            openWindowToUpload: false,
          });
        } else {
          this.setState({ loaded: 0 });
          toast.error("this type is not Allowed !!");
        }
      });
  };

  sendTheFile = () => {
    this.props.message(this.state.image);
    this.setState({ loaded: 0, readyToSend: false });
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
            id={"myText"}
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
          style={{
            ...iconsStyles,
            color: this.state.showEmojis ? "#4c94f5" : "black",
          }}
        />
        <div style={{ display: "inline-flex" }}>
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div style={{ outline: "none" }} {...getRootProps()}>
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
        </div>
        <div className="form-group">
          <Progress
            style={{
              ...iconsStyles,
              color: this.state.loaded === 100 ? "green" : "black",
            }}
            max="100"
            color="red"
            value={this.state.loaded}
          >
            {Math.round(this.state.loaded, 2)}%
          </Progress>
          <ToastContainer
            position="top-center"
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            autoClose={3000}
          />
          <div
            style={{
              width: "20%",
              backgroundColor: "white",
              position: "absolute",
              zIndex: "10",
              height: "39px",
              marginLeft: "53%",
            }}
          >
            {" "}
          </div>
          <SendFilesButton
            onClick={this.sendTheFile}
            disabled={!this.state.readyToSend}
          >
            Send The File
          </SendFilesButton>
        </div>
      </div>
    );
  }
}

export default WritingMessageSec;
