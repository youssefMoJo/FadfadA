import React from "react";
import { CommentOutlined } from "@ant-design/icons";
import YouTube from "react-youtube";
import ModalImage from "react-modal-image";

const FriendMessageStyles = {
  borderRadius: "35px",
  color: "black",
  backgroundColor: "#dbdbdb",
  width: "auto",
  maxWidth: "500px",
  padding: "15px",
  float: "left",
  marginRight: "5px",
  fontSize: "25px",
  margin: "10px",
  outline: "none",
};
const iconsStyles = {
  display: "inline",
  fontSize: "25px",
  color: "#2F80ED",
  marginLeft: "10px",
  outline: "none",
};

class FriendMessage extends React.Component {
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
      <div style={{ marginLeft: "15px", height: "auto" }}>
        <div
          style={{
            borderRadius: "25px",
            display: "inline",
            float: "left",
            width: "50px",
            height: "50px",
            backgroundColor: "#2059a5",
            textAlign: "center",
            lineHeight: "50px",
          }}
        >
          <b style={{ fontSize: "30px", color: "white" }}>
            {this.props.name.substring(0, 1).toUpperCase()}
          </b>
        </div>

        <div>
          <h3
            style={{
              display: "inline",
              verticalAlign: "bottom",
              color: "#2F80ED",
              marginLeft: "20px",
              cursor: "pointer",
            }}
          >
            {this.props.name}{" "}
            <span
              onClick={() => this.props.onClick(this.props.name)}
              style={{ marginLeft: "20px", color: "green" }}
            >
              Send Private Message
            </span>
          </h3>
          <CommentOutlined
            onClick={() => this.props.onClick(this.props.name)}
            style={{
              ...iconsStyles,
              marginLeft: "5px",
              fontSize: "15px",
              color: "green",
            }}
          />
        </div>

        {this.props.message.includes("https") &&
        this.props.message.includes("www") &&
        this.props.message.includes("youtube") ? (
          <div style={{ ...FriendMessageStyles, backgroundColor: "white" }}>
            <YouTube
              videoId={this.youtube_parser(this.props.message)}
              opts={opts}
              onReady={this._onReady}
            />
            {this.props.private ? (
              <span
                style={{
                  display: "flex",
                  color: "green",
                  marginTop: "15px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Private{" "}
              </span>
            ) : null}
          </div>
        ) : this.props.message.includes("https") ? (
          <div>
            <a
              style={{ ...FriendMessageStyles }}
              href={this.props.message}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.message}
              {this.props.private ? (
                <span
                  style={{
                    display: "flex",
                    color: "green",
                    marginTop: "15px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Private{" "}
                </span>
              ) : null}
            </a>
          </div>
        ) : this.props.message.substring(4, 11) === "uploads" ? (
          videoFormats.includes(
            this.props.message.substring(
              this.props.message.length - 3,
              this.props.message.length
            )
          ) ? (
            <div>
              <video
                style={{
                  ...FriendMessageStyles,
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
              {this.props.private ? (
                <span
                  style={{
                    display: "flex",
                    color: "green",
                    marginTop: "15px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Private{" "}
                </span>
              ) : null}
            </div>
          ) : (
            <div
              style={{
                ...FriendMessageStyles,
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
              {this.props.private ? (
                <span
                  style={{
                    display: "flex",
                    color: "green",
                    marginTop: "15px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Private{" "}
                </span>
              ) : null}
            </div>
          )
        ) : (
          <p
            style={{
              ...FriendMessageStyles,
              border: this.props.private ? "2px solid green " : null,
            }}
          >
            {this.props.message}{" "}
            {this.props.private ? (
              <span
                style={{
                  display: "flex",
                  color: "green",
                  marginTop: "15px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Private{" "}
              </span>
            ) : null}
          </p>
        )}
      </div>
    );
  }
}

export default FriendMessage;
