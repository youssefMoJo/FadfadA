import React from "react";

const UserName = (props) => {
  const userNameModel = {
    backgroundColor: "white",
    position: "absolute",
    top: "40%",
    left: "50%",
    height: "100px",
    width: "200px",
  };
  let name = "";
  const username = (e) => {
    name = e.target.value;
  };

  const sendName = (e) => {
    e.preventDefault();
    props.username(name);
  };

  return (
    <div style={{ ...userNameModel }}>
      <form onSubmit={(e) => sendName(e)}>
        <label>User Name : </label>
        <input placeholder="Your Name" onChange={(e) => username(e)} required />

        <input type="submit"></input>
      </form>
    </div>
  );
};

export default UserName;
