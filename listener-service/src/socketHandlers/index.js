const timeseriesHandler = require("./timeseries");
const socketFunction = (io) => {
  io.on("connection", (socket) => {
    timeseriesHandler(io, socket);
  });
};

module.exports = socketFunction;
