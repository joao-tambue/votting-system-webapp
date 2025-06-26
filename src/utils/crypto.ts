import CryptoJS from "crypto-js";
import { STORAGE_CRYPTO_KEY } from "../constants/constants";

const SECRET_KEY = STORAGE_CRYPTO_KEY;

function getValidKey(key: string): CryptoJS.lib.WordArray {
  const validKey = key.padEnd(32, "0").slice(0, 32);
  return CryptoJS.enc.Utf8.parse(validKey);
}

export function encrypt(value: string): string {
  try {
    const key = getValidKey(SECRET_KEY);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(value, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const result = iv
      .concat(encrypted.ciphertext)
      .toString(CryptoJS.enc.Base64);
    return result;
  } catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }
}
export function decrypt(value: string): string {
  try {
    const key = getValidKey(SECRET_KEY);

    const ciphertext = CryptoJS.enc.Base64.parse(value);

    const iv = CryptoJS.lib.WordArray.create(ciphertext.words.slice(0, 4));
    const encryptedText = CryptoJS.lib.WordArray.create(
      ciphertext.words.slice(4)
    );

    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({ ciphertext: encryptedText }),
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    throw error;
  }
}
