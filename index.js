const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

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
let userNames = [];
let users = {};
io.on("connection", (client) => {
  client.on("NewUser", (username, callback) => {
    if (userNames.includes(username)) {
      callback(true);
    } else {
      onlineUsers++;
      userNames.push(username);
      callback(false, true);
    }
  });

  client.on("getOnlineUsers", (leave) => {
    if (leave) {
      onlineUsers--;
      io.emit("onlineUsers", onlineUsers);
    } else {
      io.emit("onlineUsers", onlineUsers);
    }
  });

  client.on("gettingAllMessages", () => {
    client.emit("allMessages", messagesArray);
  });

  client.on("message", (messagesArr) => {
    messagesArray = [...messagesArr];
    client.broadcast.emit("theMessage", messagesArr);
  });

  client.on("disconnect", () => {
    if (onlineUsers === 0) {
      onlineUsers = 0;
      messagesArray = [];
      userNames = [];
    } else {
      onlineUsers--;
    }
  });
});

server.listen(5000, () => {
  console.log("the server is running ");
});
