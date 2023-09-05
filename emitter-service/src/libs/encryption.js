const CryptoJS = require("crypto-js");

const getSha256 = (str) => {
  return CryptoJS.SHA256(str);
};

const getStringifyObject = (object) => {
  return JSON.stringify(object);
};

const getObjectWithSecretKeyHash = (object) => {
  const jsonStr = getStringifyObject(object);
  const sha256 = getSha256(jsonStr);
  object["secret_key"] = sha256.toString();
  return object;
};

const getEncryptedString = (object) => {
  const jsonStr = getStringifyObject(object);

  const encrypted = CryptoJS.AES.encrypt(jsonStr, process.env.PASS_KEY, {
    mode: CryptoJS.mode.CTR,
  });

  return encrypted.toString();
};

const getDecryptedObject = (str) => {
  const decrypted = CryptoJS.AES.decrypt(str, process.env.PASS_KEY, {
    mode: CryptoJS.mode.CTR,
  });
  const strObject = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(strObject);
};

module.exports = {
  getObjectWithSecretKeyHash,
  getEncryptedString,
  getDecryptedObject,
};
