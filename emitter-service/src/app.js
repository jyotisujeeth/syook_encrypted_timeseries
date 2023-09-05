require("dotenv").config();

const path = require("path");
const io = require("socket.io-client");

const { readFile } = require("./libs/read-file");
const { getData } = require("./generate-data");

const { MESSAGE: MESSAGE_CONSTANT } = require("./constants/app_constants");

const socket = io(process.env.EMITTER_URL);

// client-side
socket.on("connect", async () => {
  console.log(socket.id);
  try {
    if (socket.connected) {
      const data_path = path.resolve(
        path.dirname(__filename),
        "data/data.json"
      );
      const data = readFile(data_path);
      while (true) {
        socket.emit(
          "encrypted-timeseries:add",
          getData(data, MESSAGE_CONSTANT.FAULTY)
        );
        console.log(new Date());
        await new Promise((resolve) =>
          setTimeout(resolve, MESSAGE_CONSTANT.COOLOFF_IN_SECONDS * 1000)
        );
      }
    } else {
      // ...
    }
  } catch (err) {
    console.log(err);
  }
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});
