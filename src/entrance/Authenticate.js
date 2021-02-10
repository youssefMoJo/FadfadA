import React, { useState } from "react";
import styled from "styled-components";
import Background from "./Background";

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
  outline: "none",
};
const FeaturesModel = styled.div`
  border-radius: 15px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
  margin-left: 25%;
  height: 500px;
  background-color: white;
  position: absolute;
  overflow: auto;
  transition: all 0.3s ease;
  margin-top: ${(props) => (props.showFeaturesModel ? "10%" : "5%")};
  opacity: ${(props) => (props.showFeaturesModel ? "1" : "0")};
  z-index: ${(props) => (props.showFeaturesModel ? "1" : "-1")};

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
const EachFeature = styled.h3`
  border-radius: 150px;
  padding: 20px;
  padding-left: 30px;
  background: linear-gradient(to right, #0f0c29, #302b63, #2c5364);
  color: white;
  line-height: 20pt;
  font-weight: normal;
`;
const BackButton = styled.button`
  border: 1px solid;
  border-radius: 150px;
  padding: 10px;
  margin-left: 6px;
  font-size: 30px;
  outline: none;
  width: 100%;
  color: green;
  cursor: pointer;
  &:hover {
    color: white;
    background: linear-gradient(to right, #093028, #237a57);
  }
`;
const Authenticate = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [showingFeaturesModel, setShowingFeaturesModel] = useState(false);

  const features = [
    "This application is about a public room where you can enter it at any time with any name that is not been used in the present room if there is one.",
    "To test the application by yourself open up a new incognito window and join the chat with a different user",
    "The user can leave the chatting room and rejoin again with the same username and password and restore all the messages, as long as the room you left is the same room you want to join. ",
    "No conversation will be saved after everyone leaves the room.",
    "The user can join the room from multiple devices.",
    "Newcomers can see all the messages since the conversation started.",
  ];

  const username = (e) => {
    setName(e.target.value)
  };

  const Password = (e) => {
    setPassword(e.target.value)
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
      }}
    >
      <Background total={25} />
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
          {props.logginginError ? (
            <div
              style={{
                width: "100%",
                color: "red",
              }}
            >
              <div>This User Name Is taken In The Present Chatting Room. </div>
              <div
                style={{
                  width: "100%",
                  color: "green",
                }}
              >
                If you are that person, make sure that the password is correct.{" "}
              </div>
            </div>
          ) : null}
          <button style={{ ...submittingButtonStyling }} type="submit">
            {" "}
            Join
          </button>
        </form>
        <button
          style={{
            ...submittingButtonStyling,
            backgroundColor: "rgb(47, 128, 237)",
          }}
          type="submit"
          onClick={() => setShowingFeaturesModel(true)}
        >
          {" "}
          How It Works ?
        </button>

        {props.onlineUsers === 0 ? (
          <div>The Chatting Room Is Empty</div>
        ) : props.onlineUsers === 1 ? (
          <div>{props.onlineUsers} Person Is Online </div>
        ) : (
              <div>{props.onlineUsers} People are Chatting Now</div>
            )}
      </UserNameModel>
      <FeaturesModel showFeaturesModel={showingFeaturesModel}>
        {features.map((eachFeature) => {
          return <EachFeature>{eachFeature}</EachFeature>;
        })}

        <BackButton onClick={() => setShowingFeaturesModel(false)}>
          go back
        </BackButton>
      </FeaturesModel>
    </div>
  );
};

export default Authenticate;
