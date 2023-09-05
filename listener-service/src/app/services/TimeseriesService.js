const TimeSeries = require("../models/TimeSeriesModel");

const addTimeseriesData = async (bulkWriteMessageArray) => {
  try {
    return await TimeSeries.bulkWrite(bulkWriteMessageArray);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getSuccessFailure = async () => {
  try {
    const details = await TimeSeries.aggregate([
      {
        $group: {
          _id: null,
          success: {
            $sum: "$success",
          },
          failure: {
            $sum: "$failed",
          },
        },
      },
    ]);
    if (!details.length) {
      throw new Error("No data");
    }
    return {
      data: {
        success: details[0].success,
        failure: details[0].failure,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPast10Timestamp = async () => {
  try {
    const details = await TimeSeries.aggregate([
      {
        $group: {
          _id: "$timestamp",
          success: {
            $sum: "$success",
          },
          failure: {
            $sum: "$failed",
          },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      { $limit: 10 },
    ]);
    if (!details.length) {
      throw new Error("No data");
    }
    return {
      data: details.reverse(),
      err: null,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserSuccessFailure = async () => {
  try {
    const details = await TimeSeries.aggregate([
      {
        $group: {
          _id: "$name",
          success: {
            $sum: "$success",
          },
          failure: {
            $sum: "$failed",
          },
        },
      },
    ]);
    if (!details.length) {
      throw new Error("No data");
    }
    return {
      data: details,
      err: null,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  addTimeseriesData,
  getSuccessFailure,
  getPast10Timestamp,
  getUserSuccessFailure,
};
