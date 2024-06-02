const dotenv = require("dotenv");
dotenv.config();
const CryptoJs = require("crypto-js");

const encryptData = (data) => {
  // const ciphertext = CryptoJs.AES.encrypt(
  //   JSON.stringify(data),
  //   `${process.env.CRYPTO_SECRET}`
  // ).toString();
  // return ciphertext;
  const encJson = CryptoJs.AES.encrypt(
    JSON.stringify(data),
    process.env.CRYPTO_SECRET
  ).toString();
  const encData = CryptoJs.enc.Base64.stringify(
    CryptoJs.enc.Utf8.parse(encJson)
  );
  return encData;
};

module.exports = encryptData;
