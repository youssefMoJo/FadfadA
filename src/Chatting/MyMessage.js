import React from "react";
import YouTube from "react-youtube";

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
    return (
      <div>
        {console.log(
          this.props.message.substring(12, this.props.message.length)
        )}
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
          this.props.message.substring(
            this.props.message.length - 3,
            this.props.message.length
          ) === "mp4" ? (
            <video
              style={{ maxWidth: "200px" }}
              src={require(`.././uploads/${this.props.message.substring(
                12,
                this.props.message.length
              )}`)}
              alt="Video"
              type="video/mp4"
              controls
            />
          ) : (
            <img
              style={{ maxWidth: "200px" }}
              src={require(`.././uploads/${this.props.message.substring(
                12,
                this.props.message.length
              )}`)}
              alt="Img"
            />
          )
        ) : (
          <p style={{ ...myMessageStyles }}>{this.props.message}</p>
        )}
      </div>
    );
  }
}

export default MyMessage;
