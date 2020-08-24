import React from "react";
import Home from "./entrance/Home";
import ChattingMainContainer from "./Chatting/ChattingMainContainer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={withRouter(Home)} />
            <Route
              path="/chatting"
              component={withRouter(ChattingMainContainer)}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
