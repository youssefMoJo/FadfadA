import React from "react";
import ConversationBoxStyles from "./ConversationBox";

const MainContainerStyles = {
  display: "grid",
  gridTemplateColumns: "auto",
  gridGap: "10px",
  backgroundColor: "white",
  padding: "0px",
  height: "751px",
  marginTop: "100px",
  width: "40%",
  borderRadius: "25px 25px 0px 0px",
};

class MainContainer extends React.Component {
  render() {
    return (
      <div style={{ ...MainContainerStyles }}>
        <ConversationBoxStyles />
      </div>
    );
  }
}

export default MainContainer;
