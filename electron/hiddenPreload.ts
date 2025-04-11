import { ipcRenderer } from "electron";

// --- Types and Configuration ---
interface Novel {
    value: string;
    text: string;
}

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


/**
 * Gets all novels from the select element and sends them to the main process
 */
function getAndSendNovels(): void {
    const novelsSelect = document.querySelector<HTMLSelectElement>(CONFIG.selectors.novelsSelect);
    if (!novelsSelect) {
        log('Novel select element not found');
        return;
    }

    const novels: Novel[] = findAndSortMatchingOptionsFormattedTS("cat", "category");


    sendMessage("novels-data-hidden", novels);
    log("Novels fetched:" + novels.length);
}

/**
 * Fetches volumes for a given novel
 */
async function fetchVolumes(novel: string): Promise<void> {
    log("Fetching volumes");

    try {
        const res = await fetch("https://kolnovel.com/wp-admin/admin-ajax.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                action: "volume_search",
                cat: novel,
            }),
        });

        const text = await res.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;

        const volumesList: {
            value: string;
            label: string;
        }[] = Array.from(tempDiv.querySelectorAll("option"))
            .slice(1)
            .map(option => ({
                value: (option as HTMLOptionElement).value,
                label: option.textContent || '',
            }));

        sendMessage("novels-volumes-hidden", volumesList);
        log(`Volumes fetched: ${volumesList.length}`);
    } catch (error) {
        log(`Error fetching volumes: ${error}`);
    }
}



// function getCurrentDateTimeFormatted() {
//     const now = new Date();

//     // Get year, month, and day
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, pad with leading zero
//     const day = String(now.getDate()).padStart(2, '0');

//     // Get hours and minutes (24-hour format)
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');

//     const formattedDate = `${year}-${month}-${day}`;

//     return {
//         date: formattedDate,
//         hours,
//         minutes,
//     };
// }




// eslint-disable-next-line @typescript-eslint/no-unused-vars
// async function submitChapter(chapterData: ChapterData) {
//     const { date, hours, minutes } = getCurrentDateTimeFormatted();
//     const [cat, series] = getTwoNumbersFromString(chapterData.novel);
//     log("Submitting chapter");

//     const formData = new URLSearchParams();
//     formData.append('ts_post_push_cb', '669f39cae3024d1424c16d42d982c93f');
//     formData.append('UTZ', 'GMT+2');
//     formData.append('myCRED_sell_content', '0');
//     formData.append('post_other', 'on');
//     formData.append('checkbox_value', 'yes');
//     formData.append('schedule_value', 'no');
//     formData.append('submit', 'نشر');
//     formData.append('title', chapterData.chapterTitle);
//     formData.append('description', chapterData.content);
//     formData.append('post_other', chapterData.postOnOtherWebsite ? 'on' : 'off');
//     formData.append('ero_chapter', chapterData.chapterNumber);
//     formData.append('ero_volume1', chapterData.volume);
//     formData.append('cat', cat ?? '');
//     formData.append('ero_series', series ?? '');
//     // date
//     formData.append('gold_date', date);
//     formData.append('date_now', date);
//     formData.append('schedule_date', date);
//     // hours 
//     formData.append('schedule_time_hh', hours);
//     formData.append('hhg', hours);
//     formData.append('hh', hours);
//     // minutes
//     formData.append('schedule_time_mn', minutes);
//     formData.append('mng', minutes);
//     formData.append('mn', minutes);



//     const res = await fetch("/post/", {
//         method: 'POST',
//         body: formData.toString(),
//     })
//     // ipcRenderer.send('data-processed-response', { status: res.ok && 'success', result: chapterData.id });
//     return res
// }

function findAndSortMatchingOptionsFormattedTS(
    selectElementId1: string,
    selectElementId2: string
): { value: string; text: string }[] {
    const select1 = document.getElementById(selectElementId1) as HTMLSelectElement | null;
    const select2 = document.getElementById(selectElementId2) as HTMLSelectElement | null;

    if (!select1 || !select2) {
        console.error("One or both select elements not found.");
        return [];
    }

    const matchingOptionsMap = new Map<string, { values: Set<string>; text: string }>();

    for (let i = 0; i < select1.options.length; i++) {
        const option1 = select1.options[i];
        const text1Lower = option1.textContent?.toLowerCase();
        if (text1Lower && !matchingOptionsMap.has(text1Lower)) {
            matchingOptionsMap.set(text1Lower, { values: new Set<string>(), text: option1.textContent ?? "unknown" });
        }
        matchingOptionsMap.get(text1Lower!)!.values.add(option1.value);
    }

    const finalMatchingOptions: { value: string; text: string }[] = [];

    for (let i = 0; i < select2.options.length; i++) {
        const option2 = select2.options[i];
        const text2Lower = option2.textContent?.toLowerCase();
        if (text2Lower && matchingOptionsMap.has(text2Lower)) {
            const existingEntry = matchingOptionsMap.get(text2Lower)!;
            existingEntry.values.add(option2.value);
            finalMatchingOptions.push({
                value: Array.from(existingEntry.values).sort().join('-'),
                text: existingEntry.text,
            });
            matchingOptionsMap.delete(text2Lower); // Prevent processing the same text again
        }
    }

    // Sort the final matching options by their text content alphabetically
    finalMatchingOptions.sort((a, b) => a.text.localeCompare(b.text));

    return finalMatchingOptions;
}




/**
 * Checks if the current page is a post page
 */
function isPostPage(): boolean {
    return window.location.href.includes(CONFIG.urlKeywords.post);
}

/**
 * Checks if the current page is an account page
 */
function isAccountPage(): boolean {
    return window.location.href.includes(CONFIG.urlKeywords.account);
}

/**
 * Checks the post page for required elements
 */
function checkPostPage(): void {
    log(`Checking for post form: ${CONFIG.selectors.postForm}`);

    const formElement = document.querySelector(CONFIG.selectors.postForm);
    if (!formElement) {
        log(`Post form not found. Sending 'form-missing' notification.`);
        sendMessage('form-missing', CONFIG.selectors.postForm);
    } else {
        log(`Post form found.`);
        sendMessage('loged-in');
        getAndSendNovels();
    }
}

/**
 * Checks the account page for required elements
 */
function checkAccountPage(): void {
    log(`Checking for account navigation.`);

    const accountNavElement = document.querySelector<HTMLDivElement>(CONFIG.selectors.accountNav);
    if (accountNavElement) {
        log(`Account navigation found. Sending 'login-success' notification.`);
        sendMessage('login-success');
    } else {
        log(`Account navigation not found.`);
    }
}





/**
 * Initializes the application
 */
function init(): void {
    log('Script loaded.');

    window.addEventListener('DOMContentLoaded', () => {
        log('DOM Content Loaded. Checking current page.');

        if (isPostPage()) {
            checkPostPage();
        } else if (isAccountPage()) {
            checkAccountPage();
        } else {
            log('Current URL does not match any specific check.');
        }
    });

    document.querySelector<HTMLButtonElement>("#description-html")?.click();
    // Set up IPC listeners
    ipcRenderer.on("novel-selected", (_, value: string) => {
        log("novel-selected");
        fetchVolumes(value);
    });

}

// Initialize the application
init();

console.log(`[Hidden Preload] Loaded.`);