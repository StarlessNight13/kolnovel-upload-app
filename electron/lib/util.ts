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


type NovelData = {
    cat: string;
    series: string;
    text: string;
}

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
 * Finds pairs of elements from two arrays that share the same 'text' property.
 * For each matching pair, creates an object containing the values from both elements
 * and their common text.
 *
 * @param {Array<HTMLOptionElement>} array1 - The first array of elements to compare.
 * @param {Array<HTMLOptionElement>} array2 - The second array of elements to compare.
 * @returns {Array<NovelData>} An array of objects, where each object represents a match
 * and has the structure { value1: any, value2: any, text: string }.
 * Returns an empty array if no matches are found or if inputs are invalid.
 */
function findMatchingElementsByText(array1: Array<HTMLOptionElement>, array2: Array<HTMLOptionElement>): Array<NovelData> {
    // Initialize an empty array to store the results
    const results: NovelData[] = [];

    // Iterate through the first array using for...of
    for (const el1 of array1) {
        // Check if the element is valid and has the required properties
        // Iterate through the second array using for...of to find a match
        for (const el2 of array2) {
            // Check if the second element is valid, has required properties, and if texts match
            if (el1.text === el2.text) {
                const cat = el1.getAttribute('value');
                const series = el2.getAttribute('value');
                if (!cat || !series) continue;
                // If a match is found, create the result object
                results.push({
                    cat: cat, // Value from the first array's element
                    series: series, // Value from the second array's element
                    text: el1.text      // The common text
                });
                break;
            }
        }

    }

    // Return the array of matched objects
    return results;
}



/**
 * Fetches all available novels
 */
async function fetchNovels(): Promise<NovelData[] | null> {
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
    const novelCategory = doc.querySelector('#cat') as HTMLSelectElement | null;
    const novelSeries = doc.querySelector('#category') as HTMLSelectElement | null;

    if (!novelCategory || !novelSeries) {
        console.error("Novel select elements not found");
        return null;
    }
    const novelCategoryOptions = Array.from(novelCategory.querySelectorAll('option')) as HTMLOptionElement[];
    const novelSeriesOptions = Array.from(novelSeries.querySelectorAll('option')) as HTMLOptionElement[];

    // Sort novels alphabetically by text
    return findMatchingElementsByText(novelCategoryOptions, novelSeriesOptions);
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
    formData.append('checkbox_value', postOnOtherWebsite ? 'yes' : 'no');
    formData.append('schedule_value', 'no');
    formData.append('schedule_date', date);
    formData.append('schedule_time_mn', minutes);
    formData.append('schedule_time_hh', hours);
    formData.append('submit', 'نشر');
    return formData;
}


type chapterPostData = {
    id: string;
    volume: string;
    series: string;
    cat: string;
    chapterNumber: string;
    chapterTitle: string;
    content: string;
    postOnOtherWebsite: boolean;
}



async function postChapter(_: IpcMainInvokeEvent, chapterData: chapterPostData) {
    const formData = createPostFormData({
        title: chapterData.chapterTitle,
        content: chapterData.content,
        ero_chapter: chapterData.chapterNumber,
        ero_series: chapterData.series,
        cat: chapterData.cat,
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

