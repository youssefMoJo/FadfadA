import React from "react";
import ChattingMainContainer from "./Chatting/ChattingMainContainer";
import UserName from "./entrance/userName";
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
        {this.state.isloggedin ? (
          <div>
            <ChattingMainContainer name={this.state.username} />
          </div>
        ) : (
          <div>
            <UserName
              username={(name) =>
                io.emit("NewUser", name, (err, pass) => {
                  if (pass) {
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
