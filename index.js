const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.listen(5000, () => {
  console.log("the server is running ");
});
