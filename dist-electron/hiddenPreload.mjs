"use strict";
const electron = require("electron");
const CONFIG = {
  selectors: {
    postForm: "#new_post",
    // MUST MATCH main.js
    accountNav: ".pms-account-navigation",
    novelsSelect: "#cat"
  },
  urlKeywords: {
    post: "post",
    account: "account"
  },
  logPrefix: "[Hidden Preload]"
};
function sendMessage(key, payload) {
  electron.ipcRenderer.send(key, payload);
}
function log(message) {
  sendMessage("console-log", `${CONFIG.logPrefix} ${message}`);
}
function getAndSendNovels() {
  const novelsSelect = document.querySelector(CONFIG.selectors.novelsSelect);
  if (!novelsSelect) {
    log("Novel select element not found");
    return;
  }
  const novels = findAndSortMatchingOptionsFormattedTS("cat", "category");
  sendMessage("novels-data-hidden", novels);
  log("Novels fetched:" + novels.length);
}
async function fetchVolumes(novel) {
  log("Fetching volumes");
  try {
    const res = await fetch("https://kolnovel.com/wp-admin/admin-ajax.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        action: "volume_search",
        cat: novel
      })
    });
    const text = await res.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    const volumesList = Array.from(tempDiv.querySelectorAll("option")).slice(1).map((option) => ({
      value: option.value,
      label: option.textContent || ""
    }));
    sendMessage("novels-volumes-hidden", volumesList);
    log(`Volumes fetched: ${volumesList.length}`);
  } catch (error) {
    log(`Error fetching volumes: ${error}`);
  }
}
function findAndSortMatchingOptionsFormattedTS(selectElementId1, selectElementId2) {
  var _a, _b;
  const select1 = document.getElementById(selectElementId1);
  const select2 = document.getElementById(selectElementId2);
  if (!select1 || !select2) {
    console.error("One or both select elements not found.");
    return [];
  }
  const matchingOptionsMap = /* @__PURE__ */ new Map();
  for (let i = 0; i < select1.options.length; i++) {
    const option1 = select1.options[i];
    const text1Lower = (_a = option1.textContent) == null ? void 0 : _a.toLowerCase();
    if (text1Lower && !matchingOptionsMap.has(text1Lower)) {
      matchingOptionsMap.set(text1Lower, { values: /* @__PURE__ */ new Set(), text: option1.textContent ?? "unknown" });
    }
    matchingOptionsMap.get(text1Lower).values.add(option1.value);
  }
  const finalMatchingOptions = [];
  for (let i = 0; i < select2.options.length; i++) {
    const option2 = select2.options[i];
    const text2Lower = (_b = option2.textContent) == null ? void 0 : _b.toLowerCase();
    if (text2Lower && matchingOptionsMap.has(text2Lower)) {
      const existingEntry = matchingOptionsMap.get(text2Lower);
      existingEntry.values.add(option2.value);
      finalMatchingOptions.push({
        value: Array.from(existingEntry.values).sort().join("-"),
        text: existingEntry.text
      });
      matchingOptionsMap.delete(text2Lower);
    }
  }
  finalMatchingOptions.sort((a, b) => a.text.localeCompare(b.text));
  return finalMatchingOptions;
}
function isPostPage() {
  return window.location.href.includes(CONFIG.urlKeywords.post);
}
function isAccountPage() {
  return window.location.href.includes(CONFIG.urlKeywords.account);
}
function checkPostPage() {
  log(`Checking for post form: ${CONFIG.selectors.postForm}`);
  const formElement = document.querySelector(CONFIG.selectors.postForm);
  if (!formElement) {
    log(`Post form not found. Sending 'form-missing' notification.`);
    sendMessage("form-missing", CONFIG.selectors.postForm);
  } else {
    log(`Post form found.`);
    sendMessage("loged-in");
    getAndSendNovels();
  }
}
function checkAccountPage() {
  log(`Checking for account navigation.`);
  const accountNavElement = document.querySelector(CONFIG.selectors.accountNav);
  if (accountNavElement) {
    log(`Account navigation found. Sending 'login-success' notification.`);
    sendMessage("login-success");
  } else {
    log(`Account navigation not found.`);
  }
}
function init() {
  var _a;
  log("Script loaded.");
  window.addEventListener("DOMContentLoaded", () => {
    log("DOM Content Loaded. Checking current page.");
    if (isPostPage()) {
      checkPostPage();
    } else if (isAccountPage()) {
      checkAccountPage();
    } else {
      log("Current URL does not match any specific check.");
    }
  });
  (_a = document.querySelector("#description-html")) == null ? void 0 : _a.click();
  electron.ipcRenderer.on("novel-selected", (_, value) => {
    log("novel-selected");
    fetchVolumes(value);
  });
}
init();
console.log(`[Hidden Preload] Loaded.`);
