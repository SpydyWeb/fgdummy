import { Provider } from "react-redux";
import { store } from "../store";
import { DataProvider } from "../reducers/DataContext";
import { KeyStoreProvider } from "../reducers/KeyStoreContext";
import { ClickProvider } from "../reducers/ClickContext";
import { AuthProvider } from "../utils/auth";
import { MsalProvider } from "@azure/msal-react";
import Routing from "../layout/Routing";

export default function AppProviders({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <DataProvider>
          <KeyStoreProvider>
            <Provider store={store}>
              <ClickProvider>
                <Routing />
              </ClickProvider>
            </Provider>
          </KeyStoreProvider>
        </DataProvider>
      </AuthProvider>
    </MsalProvider>
  );
}
