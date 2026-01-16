import './App.css';
import { useEffect,  startTransition } from 'react';
import { Provider } from "react-redux";
import { store } from "./store";
import { DataProvider } from './reducers/DataContext';
import { KeyStoreProvider } from './reducers/KeyStoreContext';
import { AuthProvider } from './utils/auth';
import { MsalProvider } from "@azure/msal-react";
import { ClickProvider } from './reducers/ClickContext';
import { useNavigate } from 'react-router-dom';
import useInactivityTimer from './utils/useInactivityTimer';
import Routing from './layout/Routing';
import { secureStorage } from './utils/secureStorage';
import  useTabManager  from './hooks/useTabManager';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { message } from 'antd';
function App({ instance }) {
  const navigate = useNavigate();
  const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  const { tabCount } = useTabManager();
  //  Session timeout + inactivity
  const isLoggedIn = secureStorage.get('sessionStartTime');
  const resetSession = () => {
    secureStorage.set('sessionStartTime', new Date().getTime().toString());
  };

  useEffect(() => {
    window.addEventListener('click', resetSession);
    window.addEventListener('keypress', resetSession);

    return () => {
      window.removeEventListener('click', resetSession);
      window.removeEventListener('keypress', resetSession);
    };
  }, [isLoggedIn]);

  const handleLogout = async () => {
    await clearClientStorage();
    await clearCacheStorage();
    await unregisterServiceWorkers();
    startTransition(() => {
      secureStorage.remove('token');
      secureStorage.remove("isLoggedIn");
      secureStorage.remove('sessionStartTime');
      sessionStorage.clear();
      instance.logoutRedirect();
      navigate("/login");
    });
  };

  const clearClientStorage = async () => {
    console.log()
    secureStorage.clear();
    sessionStorage.clear();
  };

  const clearCacheStorage = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
      }
    }
  };

  const unregisterServiceWorkers = async () => {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }
  };

  useInactivityTimer(SESSION_TIMEOUT, handleLogout);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
         message.destroy();
    message.error({
      content: error.message || "Something went wrong",
      className: "custom-msg",
      duration: 2,
    });
      },
    },
  },
});
  return (
    <MsalProvider instance={instance}>
        <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <KeyStoreProvider>
            <Provider store={store}>
              <div className="App">
                <ClickProvider>
                  <Routing />
                </ClickProvider>
              </div>
            </Provider>
          </KeyStoreProvider>
        </DataProvider>
      </AuthProvider>
      </QueryClientProvider>
    </MsalProvider>
  );
}

export default App;
