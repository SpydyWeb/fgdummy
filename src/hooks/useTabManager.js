import { useState, useEffect } from 'react';
import { secureStorage } from '../utils/secureStorage';

const useTabManager = () => {
  const [tabCount, setTabCount] = useState(1);
  const [tabId] = useState(() => Date.now().toString());

  useEffect(() => {
    const channel = new BroadcastChannel("tab-tracker");

    const addTab = () => {
      let tabs = secureStorage.get("openTabs");

      // If decryption fails or result isn't array
      if (!Array.isArray(tabs)) {
        tabs = [];
      }

      tabs.push(tabId);
      secureStorage.set("openTabs", tabs);

      setTabCount(tabs.length);
      channel.postMessage({ type: "update", count: tabs.length });
    };

    const removeTab = () => {
      let tabs = secureStorage.get("openTabs");
      if (!Array.isArray(tabs)) {
        tabs = [];
      }

      const remaining = tabs.filter((id) => id !== tabId);
      secureStorage.set("openTabs", remaining);
      channel.postMessage({ type: "update", count: remaining.length });
    };

    // Register this tab
    addTab();

    // Sync updates across tabs
    channel.onmessage = (e) => {
      if (e.data.type === "update") {
        setTabCount(e.data.count);
      }
    };

    const handleStorage = () => {
      try {
        const tabs = secureStorage.get("openTabs");
        if (Array.isArray(tabs)) {
          setTabCount(tabs.length);
        }
      } catch (err) {
        console.warn("Tab sync error:", err);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("beforeunload", removeTab);

    return () => {
      removeTab();
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("beforeunload", removeTab);
      channel.close();
    };
  }, [tabId]);

  // Close newest (extra) tab when more than 2 open
  useEffect(() => {
    if (tabCount > 2) {
      const tabs = (secureStorage.get("openTabs") || "[]");
   
      const newestTabId = tabs[tabs.length - 1];

      if (tabId === newestTabId) {
        // Delay a bit so alert shows before close
        setTimeout(() => {
          alert(" Only two sessions are allowed.\nThis tab will now close.");
          window.close();
          setTimeout(() => {
            window.location.href = "about:blank";
          }, 500);
        }, 300);
      }
    }
  }, [tabCount, tabId]);

  return { tabCount };
};

export default useTabManager;
