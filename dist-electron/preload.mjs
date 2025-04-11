"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  // You can expose other APTs you need here.
  // ...
  onURLChange: (callback) => {
    console.log('[Main Preload] Setting up listener for "url-changed"');
    const listener = (_, url) => {
      console.log(`[Main Preload] Received 'url-changed' event with URL: ${url}`);
      callback(url);
    };
    electron.ipcRenderer.on("url-changed", listener);
    return () => {
      console.log('[Main Preload] Cleaning up "url-changed" listener.');
      electron.ipcRenderer.removeListener("url-changed", listener);
    };
  }
});
