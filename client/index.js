const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const helper = require("./lib/helper");

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>"); // to check whether the server is running correctly.
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  socket.on("encryptedMessage", (arg, callback) => {
    console.log("receiving encrypted message");
    let decryptedPayload = helper.decryptPayload(arg);
    callback({ status: "ok" });
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
