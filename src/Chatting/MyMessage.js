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
    return match && match[7].length == 11 ? match[7] : false;
  }
  render() {
    const opts = {
      height: "200",
      width: "400",
    };
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
          >
            {this.props.message}
          </a>
        ) : (
          <p style={{ ...myMessageStyles }}>{this.props.message}</p>
        )}
      </div>
    );
  }
}

export default MyMessage;
