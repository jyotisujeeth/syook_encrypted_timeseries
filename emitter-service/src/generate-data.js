const { MESSAGE } = require("./constants/app_constants");

const { getRandomInt, getRandomData } = require("./libs/random-data");
const {
  getObjectWithSecretKeyHash,
  getEncryptedString,
} = require("./libs/encryption");

const MIN_SIZE = MESSAGE.COUNT_OF_MESSAGE.MIN;
const MAX_SIZE = MESSAGE.COUNT_OF_MESSAGE.MAX;

const generateEncryptedString = (data, faulty = false) => {
  const object = getRandomData(data.names, data.cities);

  const hashObject = getObjectWithSecretKeyHash(object);
  if (faulty) {
    hashObject.origin = hashObject.orgin + " fault";
  }
  return getEncryptedString(hashObject);
};

// invere_fault_rate < 0 && > 500 means no fault
// invere_fault_rate = 1 means all data is faulty
// higher the invere_fault_rate less faulty the data

const getData = (data, invere_fault_rate = 0) => {
  let message = "";
  if (invere_fault_rate >= 1 && invere_fault_rate <= 500) {
    if (invere_fault_rate == 1) {
      message = generateEncryptedString(data, true);
    } else {
      message = generateEncryptedString(data);
    }
    for (let i = 2; i < getRandomInt(MAX_SIZE - MIN_SIZE) + MIN_SIZE + 1; i++) {
      const num = getRandomInt(invere_fault_rate) + 1;
      if (i % num == 0) {
        message += `|${generateEncryptedString(data, true)}`;
      } else {
        message += `|${generateEncryptedString(data)}`;
      }
    }
  } else {
    message = generateEncryptedString(data);
    for (let i = 0; i < getRandomInt(MAX_SIZE - MIN_SIZE) + MIN_SIZE - 1; i++) {
      message += `|${generateEncryptedString(data)}`;
    }
  }
  return message;
};

module.exports = {
  getData,
};