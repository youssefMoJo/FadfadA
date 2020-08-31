import React from "react";
import { UploadOutlined, SmileOutlined, SendOutlined } from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { css } from "styled-components";
import ModalImage from "react-modal-image";

// const inputStyles = {
//   width: "430px",
//   borderRadius: "150px",
//   resize: "none",
//   outline: "none",
//   fontSize: "15px",
//   overflow: "auto",
//   padding: "10px 0px 0px 25px",
//   marginLeft: "10px",
// };

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
  // width: 430px;
  width: 400px;
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
  ${(props) =>
    props.SendFilesButtonName === "send"
      ? css`
          color: green;
          cursor: pointer;
          &:hover {
            color: white;
            background: linear-gradient(to right, #093028, #237a57);
          }
        `
      : props.SendFilesButtonName === "preview"
      ? css`
          color: green;
          cursor: pointer;
          &:hover {
            color: white;
            background: linear-gradient(to right, #093028, #237a57);
          }
        `
      : css``};
`;

// ${(props) =>
//   props.SendFilesButtonStartFlying
//     ? css`
//         transition: all 0.2s linear;
//         margin-left: 83%;
//       `
//     : css``}
//   ${(props) =>
//   props.getItBack
//     ? css`
//         transition: all 0s linear;
//         margin-left: 6px;
//         opacity: 0;
//       `
//     : css`
//         transition: all 0.3s linear;
//         opacity: 1;
//       `};

class WritingMessageSec extends React.Component {
  state = {
    message: "",
    showEmojis: false,
    loaded: 0,
    image: "",
    readyToSend: false,
    SendFilesButtonStartFlying: false,
    getItBack: false,
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
          });
        } else {
          this.setState({ loaded: 0 });
          toast.error("this type of file is not Allowed!!");
        }
      });
  };

  sendTheFile = () => {
    this.props.message(this.state.image);
    this.setState({
      loaded: 0,
      SendFilesButtonStartFlying: true,
    });

    setTimeout(() => {
      this.setState({
        readyToSend: false,
        getItBack: true,
        SendFilesButtonStartFlying: false,
      });
    }, 900);

    setTimeout(() => {
      this.setState({ getItBack: false });
    }, 1200);
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
        {!this.state.readyToSend ? (
          <div>
            <SendFilesButton
              onClick={this.sendTheFile}
              SendFilesButtonName="send"
              // disabled={!this.state.readyToSend}
              // SendFilesButtonStartFlying={this.state.SendFilesButtonStartFlying}
              // getItBack={this.state.getItBack}
            >
              Send
            </SendFilesButton>

            {/* <SendFilesButton SendFilesButtonName="preview"> */}
            <div style={{ borderRadius: "50% " }}>
              <ModalImage
                className={{ borderRadius: "50% " }}
                large={require(`.././uploads/6.png`)}
                small={require(`.././uploads/6.png`)}
                alt="Preview"
              />
            </div>
            {/* </SendFilesButton> */}
          </div>
        ) : null}

        <form>
          <InputStyles
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
        />

        {/* <div> */}
        {/* <Progress
            style={{
              ...iconsStyles,
              color: this.state.loaded === 100 ? "green" : "black",
            }}
            max="100"
            color="red"
            value={this.state.loaded}
          >
            {Math.round(this.state.loaded, 2)}%
          </Progress> */}

        {/* <div
            style={{
              ...iconsStyles,
              color: this.state.loaded === 100 ? "green" : "black",
              display: "inline",
            }}
          >
            {Math.round(this.state.loaded, 2)}%
          </div> */}
        {/* this div is to make the sendFileButton diappear */}
        {/* <div
            style={{
              width: "20%",
              backgroundColor: "green",
              display: "inline-flex",
              // position: "absolute",
              zIndex: "10",
              height: "39px",
              // marginLeft: "80%",
              // marginBottom: "10px",
              float: "right",
            }}
          >
            {" "}
          </div> */}
        {/* </div> */}
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
