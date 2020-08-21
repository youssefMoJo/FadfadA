const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
var jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let messagesArray = [];
let onlineUsers = 0;
let users = {};

io.on("connection", (client) => {
  client.on("NewUser", (username, password, callback) => {
    if (users[username]) {
      callback(true);
    } else {
      onlineUsers++;
      let name = username;
      users[name] = { password, online: true };
      callback(false, true);
    }
  });

  client.on("isTheUserOnline", (username, callback) => {
    if (users[username].online) {
      callback(true);
    } else {
      callback(false, true);
    }
  });

  client.on("getOnlineUsers", (leave) => {
    if (leave) {
      onlineUsers--;
      io.emit("onlineUsers", onlineUsers, users);
    } else {
      io.emit("onlineUsers", onlineUsers, users);
    }
  });

  client.on("gettingAllMessages", () => {
    client.emit("allMessages", messagesArray, users);
  });

  client.on("message", (messagesArr) => {
    messagesArray = [...messagesArr];
    client.broadcast.emit("theMessage", messagesArr);
  });

  client.on("disconnect", () => {
    if (onlineUsers === 0) {
      onlineUsers = 0;
      messagesArray = [];
      users = {};
    } else {
      onlineUsers--;
    }
  });
});

server.listen(5000, () => {
  console.log("the server is running ");
});
