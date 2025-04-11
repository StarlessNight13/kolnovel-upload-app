"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const electron = require("electron");
const SELECTOR_TO_CHECK = "#new_post";
const POST_URL_KEYWORD = "post";
const ACCOUNT_URL_KEYWORD = "account";
const ACCOUNT_NAV_SELECTOR = ".pms-account-navigation";
console.log("[Hidden Preload] Script loaded.");
window.addEventListener("DOMContentLoaded", () => {
  console.log("[Hidden Preload] DOM Content Loaded. Running URL-based checks.");
  const currentURL = window.location.href;
  if (currentURL.includes(POST_URL_KEYWORD)) {
    console.log(`[Hidden Preload] Current URL includes '${POST_URL_KEYWORD}'. Checking for element: ${SELECTOR_TO_CHECK}`);
    const elementToCheck = document.querySelector(SELECTOR_TO_CHECK);
    if (!elementToCheck) {
      console.log(`[Hidden Preload] Element '${SELECTOR_TO_CHECK}' NOT found. Sending 'form-missing' notification.`);
      electron.ipcRenderer.send("form-missing", SELECTOR_TO_CHECK);
    } else {
      console.log(`[Hidden Preload] Element '${SELECTOR_TO_CHECK}' found.`);
      electron.ipcRenderer.send("loged-in");
      new ChapterPage();
    }
  } else if (currentURL.includes(ACCOUNT_URL_KEYWORD)) {
    console.log(`[Hidden Preload] Current URL includes '${ACCOUNT_URL_KEYWORD}'. Checking for account navigation.`);
    const accountNavElement = document.querySelector(ACCOUNT_NAV_SELECTOR);
    if (accountNavElement) {
      console.log(`[Hidden Preload] Account navigation element found. Sending 'login-success' notification.`);
      electron.ipcRenderer.send("login-success");
    } else {
      console.log(`[Hidden Preload] Account navigation element NOT found.`);
    }
  } else {
    console.log("[Hidden Preload] Current URL does not match any specific check.");
  }
  electron.ipcRenderer.on("chapter-post", (_, chapterData) => {
    console.log("[Hidden Preload] Chapter post event received. Sending 'chapter-post' notification.");
    console.log(chapterData);
  });
});
class ChapterPage {
  constructor() {
    __publicField(this, "selectedNovel");
    __publicField(this, "selectedVolume");
    __publicField(this, "chapterNumber");
    __publicField(this, "chapterTitle");
    __publicField(this, "scheduleDate");
    __publicField(this, "sellWithGold");
    __publicField(this, "chapterContent");
    __publicField(this, "postOnOtherWebsite");
    __publicField(this, "scheduleOtherDate");
    __publicField(this, "novelSelectElement");
    __publicField(this, "volumeSelectElement");
    __publicField(this, "newVolumeCheckboxElement");
    __publicField(this, "newVolumeInputElement");
    __publicField(this, "chapterNumberInputElement");
    __publicField(this, "chapterTitleInputElement");
    __publicField(this, "scheduleDateInputElement");
    __publicField(this, "scheduleDateCheckboxElement");
    __publicField(this, "sellWithGoldCheckboxElement");
    __publicField(this, "chapterContentTextareaElement");
    __publicField(this, "postOnOtherWebsiteCheckboxElement");
    __publicField(this, "scheduleOtherDateCheckboxElement");
    __publicField(this, "scheduleOtherDateInputElement");
    this.selectedNovel = "";
    this.selectedVolume = "";
    this.chapterNumber = "";
    this.chapterTitle = "";
    this.scheduleDate = void 0;
    this.sellWithGold = false;
    this.chapterContent = "";
    this.postOnOtherWebsite = false;
    this.scheduleOtherDate = void 0;
    this.novelSelectElement = document.querySelector("#cat");
    this.volumeSelectElement = document.querySelector("#volume");
    this.newVolumeCheckboxElement = document.querySelector("#volume-new");
    this.newVolumeInputElement = document.querySelector("#ero_volume");
    this.chapterNumberInputElement = document.querySelector("#ero_chapter");
    this.chapterTitleInputElement = document.querySelector("#title");
    this.scheduleDateCheckboxElement = document.querySelector("#featers");
    this.scheduleDateInputElement = {
      start: document.querySelector("#start"),
      minute: document.querySelector("#minute"),
      hour: document.querySelector("#hour")
    };
    this.sellWithGoldCheckboxElement = document.querySelector("#gold");
    this.chapterContentTextareaElement = document.querySelector("#description");
    this.postOnOtherWebsiteCheckboxElement = document.querySelector("#post_other");
    this.scheduleOtherDateCheckboxElement = document.querySelector("#schedule_checkbox");
    this.scheduleOtherDateInputElement = {
      start: document.querySelector("#schedule_date"),
      minute: document.querySelector("#schedule_minute"),
      hour: document.querySelector("#schedule_hour")
    };
    electron.ipcRenderer.send("console-log", "Chapter page Manger created");
    electron.ipcRenderer.on("novel-selected", (_, value) => {
      electron.ipcRenderer.send("console-log", "Novel selected:" + value);
      this.fetchVolumes(value);
    });
    this.getAndSendNovles();
  }
  async fetchVolumes(novel) {
    console.log("Fetching volumes");
    const res = await fetch("https://kolnovel.com/wp-admin/admin-ajax.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        // jQuery's default for .post()
      },
      body: new URLSearchParams({
        action: "volume_search",
        cat: novel
      })
    });
    const text = await res.text();
    const tempDev = document.createElement("div");
    tempDev.innerHTML = text;
    const volumesList = Array.from(tempDev.querySelectorAll("option")).slice(1).map((option) => {
      return {
        value: option.value,
        label: option.text
      };
    });
    electron.ipcRenderer.send("novels-volumes-hidden", volumesList);
  }
  handleNovelChange(value) {
    this.selectedNovel = value;
    this.selectedVolume = "";
  }
  getAndSendNovles() {
    const novelsSelect = this.novelSelectElement;
    if (!novelsSelect) return;
    const novels = Array.from(novelsSelect.options).slice(1).map((option) => ({
      value: option.value,
      label: option.text
    }));
    electron.ipcRenderer.send("novels-data-hidden", novels);
    electron.ipcRenderer.send("console-log", "Novels data sent");
  }
}
