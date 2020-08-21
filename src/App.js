import React from "react";
import ChattingMainContainer from "./Chatting/ChattingMainContainer";
import Entrance from "./entrance/Entrance";
import openSocket from "socket.io-client";

const io = openSocket("http://localhost:5000");

class App extends React.Component {
  state = {
    username: "",
    isloggedin: false,
  };

  render() {
    return (
      <div>
        {localStorage.getItem("userOnline") ? (
          <div>
            <ChattingMainContainer name={localStorage.getItem("username")} />
          </div>
        ) : (
          <div>
            <Entrance
              formInformation={(name, password) =>
                io.emit("NewUser", name, password, (err, pass) => {
                  if (pass) {
                    localStorage.setItem("userOnline", true);
                    localStorage.setItem("username", name);
                    this.setState({
                      username: name,
                      isloggedin: true,
                    });
                  }
                })
              }
            />
          </div>
        )}
      </div>
    );
  }
}
export default App;
