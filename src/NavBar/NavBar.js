import React from "react";

const NavBarStyles = {
  width: "100%",
  height: "50px",
  backgroundColor: "black ",
  position: "absolute",
};

const AppNameStyles = {
  color: "white",
  textAlign: "left",
  position: "relative",
  margin: "0px",
  fontSize: "40px",
  marginLeft: "20px",
};

class NavBar extends React.Component {
  render() {
    return (
      <div style={{ ...NavBarStyles }}>
        <h1 style={{ ...AppNameStyles }}>
          Fadfad <span style={{ color: "#1FD7FF" }}>A</span>
        </h1>
      </div>
    );
  }
}

export default NavBar;
