import { app, IpcMainInvokeEvent } from 'electron';
import fs from 'fs/promises';
import { parse } from 'node-html-parser';
import path from 'node:path';

// Types
type DateTimeFormat = {
    date: string;
    hours: string;
    minutes: string;
    utz: string;
};

type FetchResult<T> = {
    data: T
    error: null
} | {
    data: null
    error: Error
}

type Novel = {
    value: string;
    text: string;
};

type Volume = {
    value: string;
    label: string;
};

type Cookie = {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    expirationDate?: number;
};

// Constants
const URLS = {
    LOGIN: 'https://kolnovel.com/account/',
    POST: 'https://kolnovel.com/post/',
    VOLUMES: 'https://kolnovel.com/wp-admin/admin-ajax.php'
};
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cacheDir = path.join(app.getPath('userData'), 'kolnovel-uploader');

const COOKIES_FILE_PATH = path.join(cacheDir, 'cookies.json');

/**
 * Returns a formatted date time object with current time information
 */
function getFormattedDateTime(): DateTimeFormat {
    const now = new Date();

    // Get date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Get time components
    const hours = now.getHours().toString();
    const minutes = now.getMinutes().toString();

    // Get UTC offset
    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetRemainderMinutes = Math.abs(offsetMinutes % 60);
    const sign = offsetMinutes < 0 ? '+' : '-';
    const utz = `GMT${sign}${String(offsetHours).padStart(1, '0')}${String(offsetRemainderMinutes).padStart(2, '0')}`;

    return {
        date: formattedDate,
        hours,
        minutes,
        utz
    };
}

/**
 * Loads cookies from the file system
 */
async function loadCookies(): Promise<Cookie[]> {
    try {
        const cookiesData = await fs.readFile(COOKIES_FILE_PATH, 'utf-8');
        return JSON.parse(cookiesData);
    } catch (error) {
        console.log('Error reading cookies file (may not exist yet):', error);
        await saveCookies([]);
        return [];
    }
}



/**
 * Saves cookies to the file system
 */
async function saveCookies(cookies: Cookie[]): Promise<void> {
    try {
        await fs.mkdir(path.dirname(COOKIES_FILE_PATH), { recursive: true });
        await fs.writeFile(COOKIES_FILE_PATH, JSON.stringify(cookies, null, 2));
    } catch (error) {
        console.error('Error saving cookies:', error);
    }
}

/**
 * Makes a network request with cookie authentication
 */
async function safeFetch<T>(
    url: string,
    options: RequestInit,
    responseProcessor: (res: Response) => Promise<T>
): Promise<FetchResult<T>> {
    try {
        const cookies = await loadCookies();
        const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");

        const headers = {
            ...options.headers,
            Cookie: cookieHeader,
        };

        const res = await fetch(url, {
            ...options,
            headers
        });

        if (!res.ok) {
            return {
                data: null,
                error: new Error(`Request failed with status ${res.status}`)
            };
        }

        const data = await responseProcessor(res);
        return { data, error: null };
    } catch (error) {
        console.error("Error in safeFetch:", error);
        return {
            data: null,
            error: error instanceof Error ? error : new Error("Unknown error")
        };
    }
}

/**
 * Checks if the user is currently logged in
 */
async function isLoggedIn(): Promise<boolean> {
    const result = await safeFetch(
        URLS.LOGIN,
        { method: "GET" },
        async (res) => await res.text()
    );

    if (result.error || !result.data) {
        console.error("Error checking login:", result.error);
        return false;
    }

    const doc = parse(result.data);
    const accountNav = doc.querySelector(".pms-account-navigation");
    return !!accountNav;
}

async function login(email: string, password: string): Promise<{
    logedIn: true;
    cookies: Record<string, string>;
} | {
    logedIn: false;
    cookies: null;
}> {
    const formData = createLoginFormFormData(email, password);
    console.log("🚀 ~ login ~ formData:", formData)
    const res = await fetch(URLS.LOGIN, {
        method: "POST",
        body: formData,
    });
    const cookiesHeader = res.headers.get('Set-Cookie');
    const data = await res.text();
    if (!res.ok) {
        return {
            logedIn: false,
            cookies: null,
        };
    }
    const doc = parse(data);
    const accountNav = doc.querySelector(".pms-account-navigation");

    if (accountNav) {
        const getCookies = (cookieString: string) => {
            const cookiesArray = cookieString.split(',');
            const cookies: Record<string, string> = {};
            cookiesArray.forEach(cookieString => {
                // Trim leading spaces and split each cookie string by the first '='
                const nameValuePair = cookieString.trim().split(';')[0];
                const [name, value] = nameValuePair.split('=');
                if (name && value) {
                    cookies[name] = value;
                }
            });
            return cookies;
        }
        const cookiesFromServer = getCookies(cookiesHeader ?? "");
        console.log("Logged in");
        return {
            logedIn: true,
            cookies: cookiesFromServer,
        };
    } else {
        console.log("Not logged in");
        return {
            logedIn: false,
            cookies: null,
        }
    }
}

function createLoginFormFormData(email: string, password: string, rememberMe = 'forever', wpSubmit = 'Log+In', redirectTo = 'https://kolnovel.com/account/', pmsLoginNonce = '7bb821ae6c', pmsLogin = 1, pmsRedirect = 'https://kolnovel.com/account/') {
    const formData = new FormData();

    formData.append('log', email);
    formData.append('pwd', password);
    formData.append('rememberme', rememberMe);
    formData.append('wp-submit', wpSubmit);
    formData.append('redirect_to', redirectTo);
    formData.append('pms_login_nonce', pmsLoginNonce);
    formData.append('pms_login', pmsLogin.toString());
    formData.append('pms_redirect', pmsRedirect);

    return formData;
}

/**
 * Finds and sorts matching options from two select elements using their children
 * Each child element is expected to have a 'value' attribute and text content
 */
function findAndSortMatching(
    select1: HTMLElement,
    select2: HTMLElement
): { value: string; text: string }[] {

    if (!select1 || !select2) {
        console.error("One or both select elements not found.");
        return [];
    }

    const matchingOptionsMap = new Map<string, { values: Set<string>; text: string }>();

    // Process children of first select
    const children1 = select1.querySelectorAll('option');
    for (const child of children1) {
        const textContent = child.textContent;
        const textLower = textContent?.toLowerCase();
        if (textLower && !matchingOptionsMap.has(textLower)) {
            matchingOptionsMap.set(textLower, {
                values: new Set<string>(),
                text: textContent ?? "unknown"
            });
        }
        const value = child.getAttribute('value');
        if (value && textLower) {
            matchingOptionsMap.get(textLower)!.values.add(value);
        }
    }

    const finalMatchingOptions: { value: string; text: string }[] = [];

    // Process children of second select
    const children2 = select2.querySelectorAll('option');
    for (const child of children2) {
        const textContent = child.textContent;
        const textLower = textContent?.toLowerCase();
        if (textLower && matchingOptionsMap.has(textLower)) {
            const existingEntry = matchingOptionsMap.get(textLower)!;
            const value = child.getAttribute('value');
            if (value) {
                existingEntry.values.add(value);
            }
            finalMatchingOptions.push({
                value: Array.from(existingEntry.values).sort().join('-'),
                text: existingEntry.text,
            });
            matchingOptionsMap.delete(textLower); // Prevent processing the same text again
        }
    }

    // Sort the final matching options by their text content alphabetically
    finalMatchingOptions.sort((a, b) => a.text.localeCompare(b.text));

    return finalMatchingOptions;
}

/**
 * Fetches all available novels
 */
async function fetchNovels(): Promise<Novel[] | null> {
    const result = await safeFetch(
        URLS.POST,
        { method: "GET" },
        async (res) => await res.text()
    );

    if (result.error || !result.data) {
        console.error("Error fetching novels:", result.error);
        return null;
    }

    const doc = parse(result.data);
    const novelCategory = doc.querySelector('#cat') as HTMLElement | null;
    const novelSeries = doc.querySelector('#category') as HTMLElement | null;

    if (!novelCategory || !novelSeries) {
        console.error("Novel select elements not found");
        return null;
    }

    // Sort novels alphabetically by text
    return findAndSortMatching(novelCategory, novelSeries);
}

/**
 * Fetches volumes for a specific novel
 */
async function fetchVolumes(novelId: string): Promise<Volume[] | null> {
    const formData = new URLSearchParams({
        action: "volume_search",
        cat: novelId,
    });

    const result = await safeFetch(
        URLS.VOLUMES,
        {
            method: "POST",
            body: formData
        },
        async (res) => await res.text()
    );

    if (result.error || !result.data) {
        console.error("Error fetching volumes:", result.error);
        return null;
    }

    // Parse the HTML response
    const doc = parse(result.data);
    const options = doc.querySelectorAll('option');

    // Skip the first option (usually "Select volume")
    const volumes: Volume[] = [];

    for (let i = 1; i < options.length; i++) {
        const option = options[i];
        volumes.push({
            value: option.getAttribute('value') || '',
            label: option.text || ''
        });
    }

    return volumes;
}

/**
 * Gets all cookies for a session (Electron-specific)
 */
async function getAllCookiesForSession(session: Electron.Session): Promise<Cookie[]> {
    try {
        if (!session || !session.cookies || typeof session.cookies.get !== 'function') {
            console.error('Invalid session object');
            return [];
        }

        const cookies: Cookie[] = await session.cookies.get({});
        await saveCookies(cookies);
        return cookies;
    } catch (error) {
        console.error('Error getting cookies:', error);
        return [];
    }
}

function createPostFormData({ title, content, ero_chapter, ero_series, cat, ero_volume1 = '', postOnOtherWebsite = false }: {
    title: string;
    content: string;
    ero_chapter: string;
    ero_series: string;
    cat: string;
    ero_volume1?: string;
    postOnOtherWebsite?: boolean;
}) {
    const { date, hours, minutes, utz } = getFormattedDateTime();
    const formData = new FormData();
    formData.append('ero_series', ero_series);
    formData.append('cat', cat);
    formData.append('ero_volume1', ero_volume1);
    formData.append('ts_post_push_cb', '669f39cae3024d1424c16d42d982c93f');
    formData.append('ero_chapter', ero_chapter);
    formData.append('UTZ', utz);
    formData.append('title', title);
    formData.append('date_now', date);
    formData.append('mn', minutes);
    formData.append('hh', hours);
    formData.append('myCRED_sell_content', '0');
    formData.append('gold_date', date);
    formData.append('mng', minutes);
    formData.append('hhg', hours);
    formData.append('description', content);
    formData.append('post_other', postOnOtherWebsite ? 'on' : 'off');
    formData.append('checkbox_value', 'yes');
    formData.append('schedule_value', 'no');
    formData.append('schedule_date', date);
    formData.append('schedule_time_mn', minutes);
    formData.append('schedule_time_hh', hours);
    formData.append('submit', 'نشر');
    return formData;
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

async function postChapter(_: IpcMainInvokeEvent, chapterData: {
    chapterTitle: string;
    content: string;
    chapterNumber: string;
    volume: string;
    postOnOtherWebsite: boolean;
    novel: string;
}) {
    const [cat, series] = getTwoNumbersFromString(chapterData.novel);
    const formData = createPostFormData({
        title: chapterData.chapterTitle,
        content: chapterData.content,
        ero_chapter: chapterData.chapterNumber,
        ero_series: series ?? "",
        cat: cat ?? "",
        ero_volume1: chapterData.volume,
        postOnOtherWebsite: chapterData.postOnOtherWebsite,
    });


    return await safeFetch(
        URLS.POST,
        {
            method: "POST",
            body: formData
        },
        async (res) => await res.text()
    ).then(async data => {
        const text = data.data
        if (!text) return false
        const doc = parse(text);
        const announ = doc.querySelector('.bixbox .page .announ')
        if (announ) {
            return true
        }
        return false
    });
}

export {
    createPostFormData,
    fetchNovels,
    fetchVolumes,
    getAllCookiesForSession,
    getFormattedDateTime,
    isLoggedIn,
    loadCookies,
    login,
    postChapter,
    safeFetch,
    saveCookies
};
