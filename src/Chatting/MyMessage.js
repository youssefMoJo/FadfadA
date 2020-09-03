import React from "react";
import YouTube from "react-youtube";
import ModalImage from "react-modal-image";

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
  margin: "0px",
  outline: "none",
};

class MyMessage extends React.Component {
  _onReady(event) {
    event.target.pauseVideo();
  }
  youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }
  render() {
    const opts = {
      height: "200",
      width: "400",
    };
    const videoFormats = ["mp4", "MP4"];

    return (
      <div>
        {this.props.message.includes("https") &&
        this.props.message.includes("www") &&
        this.props.message.includes("youtube") ? (
          <div style={{ ...myMessageStyles, backgroundColor: "white" }}>
            <YouTube
              videoId={this.youtube_parser(this.props.message)}
              opts={opts}
              onReady={this._onReady}
            />
          </div>
        ) : this.props.message.includes("https") ? (
          <a
            style={{ ...myMessageStyles }}
            href={this.props.message}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.message}
          </a>
        ) : this.props.message.substring(4, 11) === "uploads" ? (
          videoFormats.includes(
            this.props.message.substring(
              this.props.message.length - 3,
              this.props.message.length
            )
          ) ? (
            <video
              style={{
                ...myMessageStyles,
                maxWidth: "200px",
                backgroundColor: "white",
              }}
              src={require(`.././uploads/${this.props.message.substring(
                12,
                this.props.message.length
              )}`)}
              alt="Video"
              type="video/mp4"
              controls
            />
          ) : (
            <div
              style={{
                ...myMessageStyles,
                maxWidth: "200px",
                backgroundColor: "white",
              }}
            >
              <ModalImage
                small={require(`.././uploads/${this.props.message.substring(
                  12,
                  this.props.message.length
                )}`)}
                large={require(`.././uploads/${this.props.message.substring(
                  12,
                  this.props.message.length
                )}`)}
                alt="Picture"
              />
            </div>
          )
        ) : (
          <p
            style={{
              ...myMessageStyles,
              backgroundColor: this.props.private ? "white" : "#2F80ED",
              color: this.props.private ? "black" : "white",
              border: this.props.private ? "2px solid green " : null,
            }}
          >
            {this.props.message}
            {this.props.private ? (
              <span
                style={{
                  display: "flex",
                  color: "Green",
                  marginTop: "15px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Private To {this.props.privateTo}
              </span>
            ) : null}
          </p>
        )}
      </div>
    );
  }
}

export default MyMessage;
