import React from "react";
import ChattingMainContainer from "../Chatting/ChattingMainContainer";
import Authenticate from "../entrance/Authenticate";
import openSocket from "socket.io-client";
import { createHashHistory } from "history";

const io = openSocket("http://localhost:5000");
const history = createHashHistory();

class Home extends React.Component {
  state = {
    isloggedin: false,
  };

  render() {
    return (
      <div>
        <div>
          {localStorage.getItem("userOnline") ? (
            <div>
              {history.push("/chatting")}
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
