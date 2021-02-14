const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const bcrypt = require("bcryptjs");
const uploading = require("./backend/uploading");
const { on } = require("process");

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


const salt = bcrypt.genSaltSync(10);
let messagesArray = [];
let onlineUsers = 0;
let users = {};

io.on("connection", (client) => {
  console.log("someone is connected to the server!!")

  client.on("NewUser", (userName, password, callback) => {
    if (users[userName]) {

      let passwordChecking = bcrypt.compareSync(
        password,
        users[userName].password
      );

      if (passwordChecking) {
        if (users[userName].online === false) {
          users[userName].OnlineDevices = 1;
          onlineUsers++;
          users[userName].online = true;
          callback(false, true);
        }

        else {
          users[userName].OnlineDevices = users[userName].OnlineDevices + 1;
          callback(false, true);
        }
      }
      callback(true);
    }

    else {

      onlineUsers++;
      let name = userName;
      let hashedPassword = bcrypt.hashSync(password, salt);
      users[name] = {
        password: hashedPassword,
        online: true,
        name,
        OnlineDevices: 1,
      };
      callback(false, true);
    }
  });

  io.emit("onlineUsers", onlineUsers, users);

  client.on("getOnlineUsers", (leave, userName) => {
    if (leave) {
      users[userName].OnlineDevices = users[userName].OnlineDevices - 1;
      if (users[userName].OnlineDevices === 0) {
        onlineUsers--;
        users[userName].online = false;
      }
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
    }
  });
});
app.use(uploading);
const port = 5000
server.listen(port, () => {
  console.log("the server is running on port: " + port);
});
