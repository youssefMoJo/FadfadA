import React from "react";

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
};

class MyMessage extends React.Component {
  render() {
    return (
      <div>
        <p style={{ ...myMessageStyles }}>
          Normally we start with the JSX syntax in React to render some output
          to the browser. Essentially, JSX is a mix of HTML and JavaScript and
          tries to get the best out of both these languages.
        </p>
      </div>
    );
  }
}

export default MyMessage;
