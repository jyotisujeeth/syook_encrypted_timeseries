const Service = require("../services/TimeseriesService");

const { getDecryptedObject } = require("../libs/decryption");
const { checkHash } = require("../libs/validation");

const addTimeseriesData = async (encryptedStrings) => {
  try {
    console.log("Add timeseries Data");
    const message_arr = encryptedStrings.split("|");
    let count = 0;
    const bulkWriteArray = [];
    for (const message of message_arr) {
      count++;
      const object = getDecryptedObject(message);
      bulkWriteArray.push(checkHash(object));
    }
    return await Service.addTimeseriesData(bulkWriteArray);
  } catch (err) {
    console.log(err);
  }
};

const getSuccessFailure = async () => {
  try {
    return await Service.getSuccessFailure();
  } catch (err) {
    console.log(err);
    return {
      data: null,
      err: err,
    };
  }
};

const getPast10Timestamp = async () => {
  try {
    return await Service.getPast10Timestamp();
  } catch (err) {
    console.log(err);
    return {
      data: null,
      err: err,
    };
  }
};

const getUserSuccessFailure = async () => {
  try {
    return await Service.getUserSuccessFailure();
  } catch (err) {
    console.log(err);
    return {
      data: null,
      err: err,
    };
  }
};

const getAllSuccessFailureData = (io, socket) => {
  try {
    console.log("In success failure");
    getSuccessFailure()
      .then((data) => {
        io.to("frontend-client").emit("timeseries/success-failure", data);
      })
      .catch((err) => {
        io.to("frontend-client").emit("timeseries/success-failure", err);
      });

    getPast10Timestamp()
      .then((data) => {
        io.to("frontend-client").emit("timeseries/past-10-timestamp", data);
      })
      .catch((err) => {
        io.to("frontend-client").emit("timeseries/past-10-timestamp", err);
      });

    getUserSuccessFailure()
      .then((data) => {
        io.to("frontend-client").emit("timeseries/user-success-failure", data);
      })
      .catch((err) => {
        io.to("frontend-client").emit("timeseries/user-success-failure", err);
      });
  } catch (err) {
    console.log(err);
    return {
      data: null,
      err: err,
    };
  }
};

module.exports = {
  addTimeseriesData,
  getSuccessFailure,
  getPast10Timestamp,
  getUserSuccessFailure,
  getAllSuccessFailureData,
};
