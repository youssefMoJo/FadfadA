import React from "react";

const Authenticate = (props) => {
  const userNameModel = {
    backgroundColor: "white",
    position: "absolute",
    top: "40%",
    left: "50%",
    height: "100px",
    width: "200px",
  };

  let name = "";
  let password = "";

  const username = (e) => {
    name = e.target.value;
  };

  const Password = (e) => {
    password = e.target.value;
  };

  const sendName = (e) => {
    e.preventDefault();
    props.formInformation(name, password);
  };

  return (
    <div style={{ ...userNameModel }}>
      <form onSubmit={(e) => sendName(e)}>
        <label>User Name : </label>
        <input placeholder="Your Name" onChange={(e) => username(e)} required />

        <label>Password : </label>
        <input
          placeholder="Password"
          onChange={(e) => Password(e)}
          type="password"
          required
        />

        <input type="submit"></input>
      </form>
    </div>
  );
};

export default Authenticate;
