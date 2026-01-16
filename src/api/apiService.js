import axios from "axios";
import { encryptionService } from "./encryptionService";
import { secureStorage } from "../utils/secureStorage";

let abortController = new AbortController();

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
   signal: abortController.signal,
  // baseURL: "https://node-proxy-dvfhayc9d0acfhfe.centralindia-01.azurewebsites.net",
});
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response && error.response.status === 401) {
      // STEP 1: Cancel all ongoing Axios requests
      abortController.abort(); 
      abortController = new AbortController(); // reset controller for next requests

      // STEP 2: Show message & Wait until user clicks OK
      await new Promise((resolve) => {
        alert("Session expired. Redirecting to login...");
        resolve();
      });

      // STEP 3: Clear storage
      secureStorage.clear();
      sessionStorage.clear();

      // STEP 4: Force redirect
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export async function getLogo() {
  const res = await api.post("/getlogo");
  if (res.data?.FGLogo) {
    encryptionService.setFGLogo(res.data.FGLogo);
  }
  return res.data;
}

//  Encrypted POST helper
export async function encryptedPost(url, body) {
  const encryptedBody = encryptionService.encryptObject(body);

  const res = await api.post(url, { requestEncryptedString: encryptedBody });

  if (!res.data?.responseEncryptedString) {
    throw new Error("Invalid encrypted response");
  }
  console.log(body.fn, encryptionService.decryptObject(res.data.responseEncryptedString))
  return encryptionService.decryptObject(res.data.responseEncryptedString);
}

export async function callApi(fn, args = [], headers = {}) {
  return encryptedPost("/api/proxy", { fn, args, headers });
}

export async function uploadFileToProxy(fn, formData, headers = {}) {
  const encryptedBody = encryptionService.encryptObject({ fn, headers });
  formData.append("requestEncryptedString", encryptedBody); // encrypted metadata
  const res = await api.post("/api/proxy/upload", formData, {
    headers,
  });

  if (!res.data?.responseEncryptedString) {
    throw new Error("Invalid encrypted response");
  }
  return encryptionService.decryptObject(res.data.responseEncryptedString);
}

export async function callgetOasisChunks() {
  return await api.post("/getOasisChunks");
}
