import { ipcRenderer } from "electron";

// --- Types and Configuration ---

interface Config {
    selectors: {
        postForm: string;
        accountNav: string;
        novelsSelect: string;
    };
    urlKeywords: {
        post: string;
        account: string;
    };
    logPrefix: string;
}

const CONFIG: Config = {
    selectors: {
        postForm: '#new_post', // MUST MATCH main.js
        accountNav: '.pms-account-navigation',
        novelsSelect: '#cat'
    },
    urlKeywords: {
        post: 'post',
        account: 'account'
    },
    logPrefix: '[Hidden Preload]',
};
/**
 * Sends a message to the main process
 */
function sendMessage(key: string, payload?: unknown): void {
    ipcRenderer.send(key, payload);
}
/**
 * Logs a message through IPC
 */
function log(message: string): void {
    sendMessage('console-log', `${CONFIG.logPrefix} ${message}`);
    // console.log(`${CONFIG.logPrefix} ${message}`);
}

function getTwoNumbersFromString(inputValue: string): [string | null, string | null] {
    const parts = inputValue.split('-');
    if (parts.length === 2) {
        const num1 = parts[0];
        const num2 = parts[1];
        return [isNaN(Number(num1)) ? null : num1, isNaN(Number(num2)) ? null : num2];
    }
    return [null, null];
}
interface ChapterData {
    id: string;
    novel: string;
    volume: string;
    content: string;
    chapterNumber: string;
    chapterTitle: string;
    postOnOtherWebsite: boolean;
}
//  insert values into the inputs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function insertValues(chapter: ChapterData) {
    const [cat, series] = getTwoNumbersFromString(chapter.novel);
    const volumeSelect = document.querySelector<HTMLSelectElement>("#volume");
    const chapterNumberInput = document.querySelector<HTMLInputElement>("#ero_chapter");
    const chapterTitleInput = document.querySelector<HTMLInputElement>("#title");
    const chapterContentInput = document.querySelector<HTMLTextAreaElement>("#description");
    const chpaterOtherWebsiteCheckbox = document.querySelector<HTMLInputElement>("#post_other");
    const seriresSelect = document.querySelector<HTMLSelectElement>("#category");
    const catSelect = document.querySelector<HTMLSelectElement>("#cat");

    if (volumeSelect && chapterNumberInput && chapterTitleInput && chapterContentInput && chpaterOtherWebsiteCheckbox && seriresSelect && catSelect) {
        chpaterOtherWebsiteCheckbox.checked = chapter.postOnOtherWebsite;
        chapterContentInput.value = chapter.content;
        volumeSelect.value = chapter.volume;
        chapterNumberInput.value = chapter.chapterNumber;
        chapterTitleInput.value = chapter.chapterTitle;
        seriresSelect.value = series ?? cat ?? "";
        catSelect.value = cat ?? "";
    } else {
        log("Could not find all elements to insert values");
    }
}

function updateSearchParams(params: Record<string, string | null>) {
    const currentUrl = new URL(window.location.href);
    for (const key in params) {
        currentUrl.searchParams.set(key, params[key] ?? '');
    }
    const newUrl = currentUrl.toString();
    history.pushState(null, '', newUrl);
    // Optionally, you can trigger a custom event to notify other parts of your app
    // that the URL has changed.
    window.dispatchEvent(new CustomEvent('url-changed', { detail: newUrl }));
}




/**
 * Checks the post page for required elements
 */
function checkPostPage(id: string): void {
    log(`Checking for post form: ${CONFIG.selectors.postForm}`);

    const formElement = document.querySelector(CONFIG.selectors.postForm);
    if (!formElement) {
        log(`Post form not found. Sending 'form-missing' notification.`);
        ipcRenderer.send(`response-from-tab-${id}`, { status: 'error', id, error: 'Post form not found.' });
    }
}

function init(): void {

    window.addEventListener('DOMContentLoaded', () => {
        log('DOM Content Loaded. Checking current page.');
        const urlParams = new URLSearchParams(window.location.search);
        const processed = urlParams.get("item-processed");

        if (processed && processed !== "") {
            const id = urlParams.get("item-processed");
            ipcRenderer.send(`response-from-tab-${id}`, { status: 'success', id });
            return
        }
        ipcRenderer.on('process-item', (_, itemData) => {
            checkPostPage(itemData.id);
            insertValues(itemData).then(() => {
                updateSearchParams({ "item-processed": itemData.id, "success": "true" });
                document.querySelector<HTMLButtonElement>("#submit")?.click();
                // ipcRenderer.send(`response-from-tab-${itemData.id}`, { status: 'success', id: itemData.id });
            });
        });
    });

}

// Initialize the application
init();