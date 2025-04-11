// hiddenPreload.js
import { ipcRenderer } from 'electron';

// --- Configuration ---
const SELECTOR_TO_CHECK = '#new_post'; // MUST MATCH main.js
const POST_URL_KEYWORD = 'post';
const ACCOUNT_URL_KEYWORD = 'account';
const ACCOUNT_NAV_SELECTOR = '.pms-account-navigation';
// ---------------------

console.log('[Hidden Preload] Script loaded.');

window.addEventListener('DOMContentLoaded', () => {
    console.log('[Hidden Preload] DOM Content Loaded. Running URL-based checks.');


    const currentURL = window.location.href;

    if (currentURL.includes(POST_URL_KEYWORD)) {
        console.log(`[Hidden Preload] Current URL includes '${POST_URL_KEYWORD}'. Checking for element: ${SELECTOR_TO_CHECK}`);
        const elementToCheck = document.querySelector(SELECTOR_TO_CHECK);
        if (!elementToCheck) {
            console.log(`[Hidden Preload] Element '${SELECTOR_TO_CHECK}' NOT found. Sending 'form-missing' notification.`);
            ipcRenderer.send('form-missing', SELECTOR_TO_CHECK);
        } else {
            console.log(`[Hidden Preload] Element '${SELECTOR_TO_CHECK}' found.`);
            ipcRenderer.send('loged-in');
            new ChapterPage()
        }
    } else if (currentURL.includes(ACCOUNT_URL_KEYWORD)) {
        console.log(`[Hidden Preload] Current URL includes '${ACCOUNT_URL_KEYWORD}'. Checking for account navigation.`);
        const accountNavElement = document.querySelector<HTMLDivElement>(ACCOUNT_NAV_SELECTOR);
        if (accountNavElement) {
            console.log(`[Hidden Preload] Account navigation element found. Sending 'login-success' notification.`);
            ipcRenderer.send('login-success');
        } else {
            console.log(`[Hidden Preload] Account navigation element NOT found.`);
            // Consider sending a different IPC event if the account navigation is missing unexpectedly
        }

    } else {
        console.log('[Hidden Preload] Current URL does not match any specific check.');
    }
    ipcRenderer.on("chapter-post", (_, chapterData) => {
        console.log("[Hidden Preload] Chapter post event received. Sending 'chapter-post' notification.");
        console.log(chapterData);
    })

});





class ChapterPage {
    selectedNovel: string;
    selectedVolume: string;
    chapterNumber: string;
    chapterTitle: string;
    scheduleDate?: Date;
    sellWithGold: boolean;
    chapterContent: string;
    postOnOtherWebsite: boolean;
    scheduleOtherDate?: Date;
    novelSelectElement: HTMLSelectElement;
    volumeSelectElement: HTMLSelectElement;
    newVolumeCheckboxElement: HTMLInputElement;
    newVolumeInputElement: HTMLInputElement;
    chapterNumberInputElement: HTMLInputElement;
    chapterTitleInputElement: HTMLInputElement;
    scheduleDateInputElement: {
        start: HTMLInputElement;
        minute: HTMLInputElement;
        hour: HTMLInputElement;
    };
    scheduleDateCheckboxElement: HTMLInputElement;
    sellWithGoldCheckboxElement: HTMLInputElement;
    chapterContentTextareaElement: HTMLTextAreaElement;
    postOnOtherWebsiteCheckboxElement: HTMLInputElement;
    scheduleOtherDateCheckboxElement: HTMLInputElement;
    scheduleOtherDateInputElement: {
        start: HTMLInputElement;
        minute: HTMLInputElement;
        hour: HTMLInputElement;
    };
    constructor() {
        this.selectedNovel = "";
        this.selectedVolume = "";
        this.chapterNumber = "";
        this.chapterTitle = "";
        this.scheduleDate = undefined;
        this.sellWithGold = false;
        this.chapterContent = "";
        this.postOnOtherWebsite = false;
        this.scheduleOtherDate = undefined;

        this.novelSelectElement = document.querySelector<HTMLSelectElement>('#cat')!;
        this.volumeSelectElement = document.querySelector<HTMLSelectElement>('#volume')!;
        this.newVolumeCheckboxElement = document.querySelector<HTMLInputElement>('#volume-new')!;
        this.newVolumeInputElement = document.querySelector<HTMLInputElement>('#ero_volume')!;
        this.chapterNumberInputElement = document.querySelector<HTMLInputElement>('#ero_chapter')!;
        this.chapterTitleInputElement = document.querySelector<HTMLInputElement>('#title')!;
        this.scheduleDateCheckboxElement = document.querySelector<HTMLInputElement>('#featers')!;
        this.scheduleDateInputElement = {
            start: document.querySelector<HTMLInputElement>('#start')!,
            minute: document.querySelector<HTMLInputElement>('#minute')!,
            hour: document.querySelector<HTMLInputElement>('#hour')!,
        }
        this.sellWithGoldCheckboxElement = document.querySelector<HTMLInputElement>('#gold')!;
        this.chapterContentTextareaElement = document.querySelector<HTMLTextAreaElement>('#description')!;
        this.postOnOtherWebsiteCheckboxElement = document.querySelector<HTMLInputElement>('#post_other')!;
        this.scheduleOtherDateCheckboxElement = document.querySelector<HTMLInputElement>('#schedule_checkbox')!;
        this.scheduleOtherDateInputElement = {
            start: document.querySelector<HTMLInputElement>('#schedule_date')!,
            minute: document.querySelector<HTMLInputElement>('#schedule_minute')!,
            hour: document.querySelector<HTMLInputElement>('#schedule_hour')!,
        }

        ipcRenderer.send("console-log", "Chapter page Manger created");

        ipcRenderer.on("novel-selected", (_, value: string) => {
            ipcRenderer.send("console-log", "Novel selected:" + value);
            this.fetchVolumes(value);
        });

        this.getAndSendNovles()
    }

    async fetchVolumes(novel: string) {
        console.log("Fetching volumes");
        const res = await fetch("https://kolnovel.com/wp-admin/admin-ajax.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", // jQuery's default for .post()
            },
            body: new URLSearchParams({
                action: "volume_search",
                cat: novel,
            }),
        });
        const text = await res.text();
        const tempDev = document.createElement('div');
        tempDev.innerHTML = text;
        const volumesList = Array.from(tempDev.querySelectorAll("option")).slice(1).map((option) => {
            return {
                value: option.value,
                label: option.text,
            }
        });
        ipcRenderer.send("novels-volumes-hidden", volumesList);
    }

    handleNovelChange(value: string) {
        this.selectedNovel = value;
        this.selectedVolume = "";
    }



    getAndSendNovles() {
        const novelsSelect = this.novelSelectElement
        if (!novelsSelect) return;
        const novels = Array.from(novelsSelect.options).slice(1).map((option) => ({
            value: option.value,
            label: option.text,
        }));
        ipcRenderer.send("novels-data-hidden", novels);
        ipcRenderer.send("console-log", "Novels data sent");
    }
}