import { encryptionService } from "../api/encryptionService";


export const secureStorage = {
  // Encrypt and save (handles strings + objects)
  set(key, value) {
    try {
      const data = encryptionService.encryptObject(value);
      localStorage.setItem(key, data);
    } catch (err) {
      console.error("Error encrypting localStorage data:", err);
    }
  },

  // Decrypt and return
  get(key) {
     try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const decrypted = encryptionService.decryptObject(encrypted);

      //  Prevent double-parsing problems
      if (typeof decrypted === "string") {
        try {
          return JSON.parse(decrypted);
        } catch {
          return decrypted;
        }
      }

      return decrypted;
    } catch (err) {
      console.error(" Error decrypting localStorage data:", err);
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
