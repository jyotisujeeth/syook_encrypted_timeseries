// DEPRECATED

const Controller = require("./app/controllers/timeseriesController");
const socketFunction = (io) => {
  io.on("connection", (socket) => {
    console.log("a user is connected");
    socket.on("timeseries", async (message) => {
      await Controller.addTimeseriesData(message);
    });
  });
};

module.exports = socketFunction;
