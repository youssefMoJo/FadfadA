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
let onloneUsers = 0;
io.on("connection", (client) => {
  onloneUsers++;
  client.on("NewUser", () => {
    client.emit("allMessages", messagesArray);
  });

  client.on("message", (messagesArr) => {
    messagesArray = [...messagesArr];
    client.broadcast.emit("theMessage", messagesArr);
  });

  client.on("disconnect", () => {
    onloneUsers--;
    if (onloneUsers === 0) {
      messagesArray = [];
    }
  });
});

server.listen(5000, () => {
  console.log("the server is running ");
});
