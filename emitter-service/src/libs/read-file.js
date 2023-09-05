const fs = require("fs");

const readFile = (path) => {
  try {
    const jsonString = fs.readFileSync(path);
    return JSON.parse(jsonString);
  } catch (err) {
    throw err;
  }
};

module.exports = { readFile };

