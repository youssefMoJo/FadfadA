import React from "react";
import ChattingMainContainer from "./Chatting/ChattingMainContainer";
import UserName from "./entrance/userName";

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
                this.setState({
                  username: name,
                  isloggedin: true,
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
