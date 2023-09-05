require("dotenv").config();

const express = require("express");

const cors = require("cors");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.status(200).end();
});

app.get("/status", (req, res) => {
  res.status(200).end();
});
app.head("/status", (req, res) => {
  res.status(200).end();
});
app.use(cors());

app.use(require("morgan")("dev"));

const uri =
  `mongodb+srv://${process.env.DATABASE_USERNAME}:` +
  `${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/` +
  `${process.env.DATABASE_NAME}?retryWrites=true&w=majority&readPreference=secondaryPreferred`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

require("./socketHandlers")(io);
app.use(require("./routers"));

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

async function startServer() {
  server.listen(process.env.PORT || 3000, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(
      `Your server is ready to listen PORT: ${process.env.PORT || 3000}!`
    );
  });
}

// Run the async function to start our server
startServer();
