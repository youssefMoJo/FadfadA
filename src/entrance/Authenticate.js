import React from "react";
import styled from "styled-components";

const Authenticate = (props) => {
  const UserNameModel = styled.div`
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    width: 25%;
    margin-left: 37%;
    margin-top: 20%;
    @media (max-width: 940px) {
      width: 50%;
      margin-left: 25%;
      margin-top: 25%;
    }
    @media (max-width: 600px) {
      width: auto;
      margin-top: 50%;
      margin-left: 0%;
    }
  `;

  const inputStyling = {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  };
  const submittingButtonStyling = {
    width: "100%",
    backgroundColor: " #4CAF50",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
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
    <UserNameModel>
      <form onSubmit={(e) => sendName(e)}>
        <label>User Name : </label>
        <input
          style={{ ...inputStyling }}
          placeholder="Your Name"
          onChange={(e) => username(e)}
          required
        />

        <label>Password : </label>
        <input
          style={{ ...inputStyling }}
          placeholder="Password"
          onChange={(e) => Password(e)}
          type="password"
          required
        />

        <button style={{ ...submittingButtonStyling }} type="submit">
          {" "}
          Join
        </button>
      </form>
    </UserNameModel>
  );
};

export default Authenticate;
