const Controller = require("../app/controllers/timeseriesController");

module.exports = (io, socket) => {
  const addTimeseriesData = async function (payload) {
    socket.join("listener-client");
    await Controller.addTimeseriesData(payload);
    Controller.getAllSuccessFailureData(io, socket);
  };

  const getSuccessFailure = async function (payload) {
    socket.join("frontend-client");
    Controller.getAllSuccessFailureData(io, socket);
  };

  socket.on("encrypted-timeseries:add", addTimeseriesData);
  socket.on("timeseries/success-failure:get", getSuccessFailure);
};
