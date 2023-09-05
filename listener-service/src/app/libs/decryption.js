const CryptoJS = require("crypto-js");

const getDecryptedObject = (str) => {
  const decrypted = CryptoJS.AES.decrypt(str, process.env.PASS_KEY, {
    mode: CryptoJS.mode.CTR,
  });
  const strObject = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(strObject);
};

module.exports = {
  getDecryptedObject,
};
