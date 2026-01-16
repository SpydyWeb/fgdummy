import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import PolicyDetailsReducer from "../reducers/policyDetailsReducer";
import ProfileReducer from "../reducers/ProfileReducer";
import EmailMngReducer from "../reducers/EmailMngReducer";
import serviceWorkerReducer from "../reducers/serviceWorker";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["oidc"], // keep what you want
};

const rootReducer = combineReducers({
  policyDetails: PolicyDetailsReducer,
  userProfileInfo: ProfileReducer,
  EmailMngInfo: EmailMngReducer,
  serviceWReducer: serviceWorkerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // persist needs this disabled
    }),

  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
