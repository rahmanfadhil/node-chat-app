const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const messages = ["Welcome to the chatroom!"];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.use("/", express.static(__dirname + "/public"));

server.listen(3000);

io.on("connection", socket => {
  socket.on("message", message => {
    messages.push(message);
    io.emit("message", message);
  });
});