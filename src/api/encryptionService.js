// encryptionService.js
import CryptoJS from "crypto-js";
import { IpAddress } from "../utils/IpAddress";

let Oasis_Key = ""; 

// Service
export const encryptionService = {
  setOasis_Key: (logo) => {
    Oasis_Key = logo;
    sessionStorage.setItem("Oasis_Junks", logo);
  },
  getOasis_key: () => {
    return Oasis_Key || sessionStorage.getItem("Oasis_Junks") || "";
  },
  encryptObject: (data) => {
    Oasis_Key = Oasis_Key || sessionStorage.getItem("Oasis_Junks") || "";
    const key = CryptoJS.enc.Utf8.parse(IpAddress._wer(Oasis_Key));
    const iv = CryptoJS.enc.Utf8.parse(IpAddress._rp(Oasis_Key));
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },

  decryptObject: (encryptedData) => {
    Oasis_Key = Oasis_Key || sessionStorage.getItem("Oasis_Junks") || "";
    const key = CryptoJS.enc.Utf8.parse(IpAddress._wer(Oasis_Key));
    const iv = CryptoJS.enc.Utf8.parse(IpAddress._rp(Oasis_Key));
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  },
};
