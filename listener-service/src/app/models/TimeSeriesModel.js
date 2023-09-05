const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const TimeSeriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    timeSeriesData: [
      {
        _id: 0,
        timestamp: {
          type: Date,
        },
        origin: {
          type: String,
        },
        destination: {
          type: String,
        },
      },
    ],
    success: {
      type: Number,
      default: 0,
    },
    failed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TimeSeries = mongoose.model("TimeSeries", TimeSeriesSchema, "timeseries");
module.exports = TimeSeries;

