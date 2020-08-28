import React from "react";
import ChattingMainContainer from "../Chatting/ChattingMainContainer";
import Authenticate from "../entrance/Authenticate";
import openSocket from "socket.io-client";

const io = openSocket("http://localhost:5000");

class Home extends React.Component {
  state = {
    isloggedin: false,
  };
  loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
  };
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "white", height: "100px" }}>
          <p>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              onChange={(e) => this.loadFile(e)}
              style={{ display: "none" }}
            />
          </p>
          <p>
            <label htmlFor="file" style={{ cursor: "cursor" }}>
              Upload Image
            </label>
          </p>
          <p>
            <img id="output" width="200" />
          </p>
        </div>

        <div>
          {localStorage.getItem("userOnline") ? (
            <div>
              <ChattingMainContainer name={localStorage.getItem("username")} />
            </div>
          ) : (
            <div>
              <Authenticate
                formInformation={(name, password) =>
                  io.emit("NewUser", name, password, (err, pass) => {
                    if (pass) {
                      localStorage.setItem("userOnline", true);
                      localStorage.setItem("username", name);
                      this.setState({
                        isloggedin: true,
                      });
                    }
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
