const dotenv = require("dotenv");
dotenv.config();
const CryptoJs = require("crypto-js");

const encryptData = (data) => {
  const ciphertext = CryptoJs.AES.encrypt(
    JSON.stringify(data),
    `${process.env.CRYPTO_SECRET}`
  ).toString();

  return ciphertext;
};

module.exports = encryptData;
