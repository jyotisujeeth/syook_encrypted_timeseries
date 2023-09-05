const CryptoJS = require("crypto-js");

const getSha256 = (str) => {
  return CryptoJS.SHA256(str);
};

const getStringifyObject = (object) => {
  return JSON.stringify(object);
};

const checkHash = (object) => {
  const key = object.secret_key;
  delete object.secret_key;
  const objString = getStringifyObject(object);
  const hashOfObject = getSha256(objString).toString();
  if (key == hashOfObject) {
    return bulkWriteSuccessObj(object);
  }
  return bulkWriteFailedObj(object);
};

const bulkWriteSuccessObj = (object) => {
  const timestamp = new Date();
  // object["secret_key"] = key;
  return {
    updateOne: {
      filter: {
        name: object.name,
        timestamp: new Date(timestamp).setSeconds(0, 0),
      },
      update: {
        $push: {
          timeSeriesData: {
            timestamp: timestamp,
            destination: object.destination,
            origin: object.origin,
          },
        },
        $inc: {
          success: 1,
        },
      },
      upsert: true,
    },
  };
};

const bulkWriteFailedObj = (object) => {
  const timestamp = new Date();
  // object["secret_key"] = key;
  return {
    updateOne: {
      filter: {
        name: object.name,
        timestamp: new Date(timestamp).setSeconds(0, 0),
      },
      update: {
        $inc: {
          failed: 1,
        },
      },
      upsert: true,
    },
  };
};

module.exports = {
  checkHash,
};
