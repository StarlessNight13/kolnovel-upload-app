import { ipcRenderer } from 'electron';

// --- Types and Configuration ---
interface Novel {
    value: string;
    label: string;
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
 * Communication handler for sending messages to the main process
 */
class CommunicationService {
    static sendMessage(key: string, payload?: unknown): void {
        ipcRenderer.send(JSON.stringify({ key, payload }));
    }

    static log(message: string): void {
        this.sendMessage('console-log', `${CONFIG.logPrefix} ${message}`);
    }
}

/**
 * Novel data handler
 */
class NovelService {
    static getAndSendNovels(): void {
        const novelsSelect = document.querySelector<HTMLSelectElement>(CONFIG.selectors.novelsSelect);
        if (!novelsSelect) {
            CommunicationService.log('Novel select element not found');
            return;
        }

        const novels: Novel[] = Array.from(novelsSelect.options)
            .slice(1)
            .map(option => ({
                value: option.value,
                label: option.text,
            }));

        CommunicationService.sendMessage("novels-data-hidden", novels);
        CommunicationService.log("Novels fetched:" + novels.length);
    }

    static async fetchVolumes(novel: string): Promise<void> {
        CommunicationService.log("Fetching volumes");

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

            const volumesList: Novel[] = Array.from(tempDiv.querySelectorAll("option"))
                .slice(1)
                .map(option => ({
                    value: (option as HTMLOptionElement).value,
                    label: option.textContent || '',
                }));

            CommunicationService.sendMessage("novels-volumes-hidden", volumesList);
            CommunicationService.log(`Volumes fetched: ${volumesList.length}`);
        } catch (error) {
            CommunicationService.log(`Error fetching volumes: ${error}`);
        }
    }
}

/**
 * Page detection and element checking
 */
class PageService {
    static isPostPage(): boolean {
        return window.location.href.includes(CONFIG.urlKeywords.post);
    }

    static isAccountPage(): boolean {
        return window.location.href.includes(CONFIG.urlKeywords.account);
    }

    static checkPostPage(): void {
        CommunicationService.log(`Checking for post form: ${CONFIG.selectors.postForm}`);

        const formElement = document.querySelector(CONFIG.selectors.postForm);
        if (!formElement) {
            CommunicationService.log(`Post form not found. Sending 'form-missing' notification.`);
            CommunicationService.sendMessage('form-missing', CONFIG.selectors.postForm);
        } else {
            CommunicationService.log(`Post form found.`);
            CommunicationService.sendMessage('loged-in');
            NovelService.getAndSendNovels();
        }
    }

    static checkAccountPage(): void {
        CommunicationService.log(`Checking for account navigation.`);

        const accountNavElement = document.querySelector<HTMLDivElement>(CONFIG.selectors.accountNav);
        if (accountNavElement) {
            CommunicationService.log(`Account navigation found. Sending 'login-success' notification.`);
            CommunicationService.sendMessage('login-success');
        } else {
            CommunicationService.log(`Account navigation not found.`);
        }
    }
}

/**
 * Main application initialization
 */
class App {
    static init(): void {
        CommunicationService.log('Script loaded.');

        window.addEventListener('DOMContentLoaded', () => {
            CommunicationService.log('DOM Content Loaded. Checking current page.');

            if (PageService.isPostPage()) {
                PageService.checkPostPage();
            } else if (PageService.isAccountPage()) {
                PageService.checkAccountPage();
            } else {
                CommunicationService.log('Current URL does not match any specific check.');
            }
        });

        // Set up IPC listeners here if needed
        /*
        ipcRenderer.on('message-from-main', (event, message) => {
          // Handle messages from main process
        });
        */

        ipcRenderer.on("novel-selected", (_, value: string) => {
            NovelService.fetchVolumes(value);
        });
    }
}

// Initialize the application
App.init();