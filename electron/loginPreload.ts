import { ipcRenderer } from "electron";


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
    sendMessage('console-log', `${message}`);
    // console.log(`${CONFIG.logPrefix} ${message}`);
}




/**
 * Checks the account page for required elements
 */
function checkAccountPage(): void {
    log(`Checking for account navigation.`);

    const accountNavElement = document.querySelector<HTMLDivElement>(".pms-account-navigation");
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
        checkAccountPage();
    });

}

// Initialize the application
init();

console.log(`[Hidden Preload] Loaded.`);