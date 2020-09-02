import React from "react";
import styled from "styled-components";
import Background from "./Background";

const Authenticate = (props) => {
  const UserNameModel = styled.div`
    border-radius: 15px;
    background-color: #f2f2f2;
    padding: 20px;
    width: 25%;
    margin-left: 37%;
    margin-top: 20%;
    position: absolute;
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
    cursor: "pointer",
    borderRadius: " 15px",
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
    <div
      style={{
        width: "100%",
        height: "100%",
        // position: "absolute",
      }}
    >
      <Background total={35} />
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
          {!props.logginginError ? (
            <div
              style={{
                width: "100%",
                color: "red",
              }}
            >
              <div>This User Name Is taken In The Present Chatting Room. </div>
              <div>
                If you are that person, make sure that the password is correct.{" "}
              </div>
            </div>
          ) : null}
          <button style={{ ...submittingButtonStyling }} type="submit">
            {" "}
            Join
          </button>
        </form>
      </UserNameModel>
    </div>
  );
};

export default Authenticate;
