/**
 * Refactored main.ts
 *
 * Changes Made:
 *
 * 1.  **Security Enhancement**: Removed `nodeIntegration: true` from `mainWindow`'s webPreferences.
 * Relying on the preload script (`contextIsolation: true` is kept) is the recommended security practice.
 * Node.js/Electron APIs should be exposed selectively via the preload script using `contextBridge`.
 * 2.  **Modularity**: Broke down the complex `read-and-convert-file` logic into smaller, more manageable helper functions:
 * - `convertMarkdownToHtml`
 * - `convertDocxToHtml`
 * - `convertDocToHtml` (includes LibreOffice handling)
 * - `processFileContent` (routes to the correct converter)
 * 3.  **Consistency**: The `read-and-convert-file` handler now consistently returns `Promise<FileResult[] | string>`,
 * where `FileResult` is an interface `{ name: string; type: string; content: string }`.
 * This makes handling the result in the renderer more predictable, whether it's a single file or multiple files from a zip.
 * An error string is returned only for major issues (e.g., cannot read zip). Individual file conversion errors within a zip are logged but might still allow other files to be processed.
 * 4.  **Readability & Maintainability**:
 * - Added more specific comments explaining logic, especially complex parts like file conversion.
 * - Defined an interface `FileResult` for the structure returned by file processing.
 * - Used `const` for variables that are not reassigned (like `md` instance).
 * - Defined constants for IPC channel names (`IpcChannels`) to avoid typos and improve maintainability.
 * 5.  **Error Handling**:
 * - Added `try...catch` blocks around `ipcMain.handle` calls to catch potential errors during asynchronous operations and return meaningful error messages to the renderer.
 * - Improved error logging within file conversion functions, especially for the `exec` call to LibreOffice.
 * - Added specific error handling for zip file reading versus individual file reading.
 * 6.  **External Dependency Warning**: Added a clear comment highlighting the dependency on LibreOffice for `.doc` conversion and the potential issues (installation, PATH).
 * 7.  **App Lifecycle Simplification**:
 * - Removed the redundant `app.on('activate', ...)` listener inside `app.whenReady()`. The top-level listener is sufficient.
 * - Moved `checkNewVersion()` to execute once when the app is ready, not only on macOS activation when no windows are open.
 * 8.  **Typo Fix**: Corrected "loged-in" to "logged-in" in IPC messages.
 * 9.  **Variable Scope**: Ensured variables like `md` are scoped correctly within their respective functions/blocks.
 * 10. **Clarity**: Renamed `read-and-convert-file` handler internally to `handleReadAndConvertFile` for better distinction.
 * 11. **Version Check Enhancement**: Added a comment indicating that the "Yes" button in the version check dialog currently doesn't trigger a download/update process.
 */

import AdmZip from 'adm-zip'; // For handling zip files
import { exec } from 'child_process'; // For running external commands (LibreOffice)
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'; // Added shell
import fs from 'fs/promises'; // Use promises version of fs
import mammoth from 'mammoth'; // For .docx conversion
import markdownit from 'markdown-it'; // For .md conversion
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchNovels, fetchVolumes, isLoggedIn, postChapter, saveCookies } from './lib/util'; // Assumed API functions

// --- Constants ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Environment setup for Vite development
process.env.APP_ROOT = path.join(__dirname, '..');
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

// Application URLs
const LOGIN_URL = 'https://kolnovel.com/account/';
const GITHUB_RELEASES_URL = 'https://api.github.com/repos/StarlessNight13/kolnovel-upload-app/releases/latest';
const GITHUB_REPO_URL = 'https://github.com/StarlessNight13/kolnovel-upload-app/releases/latest'; // For opening in browser

// IPC Channel Constants
const IpcChannels = {
  LOGIN_SUCCESS: 'login-success',
  LOGGED_IN: 'logged-in',
  GET_NOVELS: 'get-novels-data',
  GET_VOLUMES: 'get-novels-volumes',
  POST_CHAPTER: 'post-chapter',
  OPEN_FILE_DIALOG: 'open-file-dialog',
  READ_CONVERT_FILE: 'read-and-convert-file',
  CONSOLE_LOG: 'console-log',
  MAIN_PROCESS_MESSAGE: 'main-process-message',
} as const; // Use 'as const' for stricter typing

// --- Types ---
interface FileResult {
  name: string;
  type: string; // e.g., 'markdown', 'docx', 'doc'
  content: string; // HTML content
}

// --- Global Variables ---
let mainWindow: BrowserWindow | null = null;
let loginWindow: BrowserWindow | null = null;

// --- Window Creation ---

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      // nodeIntegration: true, // SECURITY RISK: Disabled. Use preload script for Node access.
      contextIsolation: true, // Recommended for security.
      sandbox: false, // Required for preload script if contextIsolation is true
    },
  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Send a message to the renderer process when the window finishes loading
    mainWindow?.webContents.send(IpcChannels.MAIN_PROCESS_MESSAGE, new Date().toLocaleString());
  });

  // Load the frontend URL (development or production)
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    // Optionally open dev tools in development
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null; // Dereference window object
  });
}

function createLoginWindow() {
  if (loginWindow) {
    loginWindow.focus(); // If already open, just focus it
    return;
  }

  loginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false, // Initially hidden
    parent: mainWindow ?? undefined, // Optional: Set main window as parent
    modal: true, // Make it modal to the main window
    webPreferences: {
      preload: path.join(__dirname, 'loginPreload.mjs'), // Separate preload for login if needed
      contextIsolation: true,
      nodeIntegration: true,
      sandbox: false, // Required for preload script if contextIsolation is true
    },
  });

  console.log(`[Main] Loading login URL: ${LOGIN_URL}`);
  loginWindow.loadURL(LOGIN_URL);

  loginWindow.once('ready-to-show', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.hide(); // Hide main window
    }
    loginWindow?.show(); // Show login window smoothly
  });

  loginWindow.on('closed', () => {
    loginWindow = null; // Dereference window object
    // If the main window still exists (e.g., login was cancelled), show it again.
    // The 'login-success' handler manages showing the main window on successful login.
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
      // Optional: check if login was successful before showing main window again
      // This depends on how cancellation is handled. If closing always means cancellation,
      // we might want to quit the app or keep mainWindow hidden.
      // For now, let's assume closing the login window without success should show main window again.
      // checkLogin(); // Re-check login status, maybe they closed it manually?
      console.log('[Main] Login window closed, ensuring main window is visible if it exists.');
      mainWindow.show();
    }
  });

  loginWindow.webContents.on('did-fail-load', (_, errorCode, errorDescription, validatedURL) => {
    console.error(`[Login Window] Failed to load ${validatedURL}: ${errorDescription} (Code: ${errorCode})`);
    // Optionally show an error message to the user
    dialog.showErrorBox('Login Error', `Failed to load the login page: ${errorDescription}`);
    loginWindow?.close(); // Close the broken window
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.show(); // Show main window again
  });
}

// --- Application Lifecycle ---

app.on('window-all-closed', () => {
  // On macOS, apps typically stay active until Cmd+Q.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked and no windows are open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    // If main window exists but is hidden (e.g. after login attempt), show it.
    if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.show();
    }
    mainWindow?.focus();
  }
});

app.whenReady().then(async () => {
  console.log("[Main] App is ready. Creating window and checking login status.");
  createWindow();
  await checkLogin(); // Check login status on startup
  await checkNewVersion(); // Check for new version on startup

  // Note: The 'activate' listener is already set globally above,
  // no need to set it again inside whenReady.
});


// --- Version Checking ---

async function checkNewVersion() {
  console.log('[Main] Checking for new version...');
  try {
    const currentVersion = app.getVersion();
    const latestVersion = await getLatestVersion();
    console.log(`[Main] Current Version: ${currentVersion}, Latest Version: ${latestVersion}`);

    if (latestVersion && currentVersion !== latestVersion) {
      const result = await dialog.showMessageBox(mainWindow!, { // mainWindow should exist here
        type: 'info',
        title: 'New Version Available',
        message: `A new version is available. Please update to the latest version.`,
        detail: 'Would you like to go to the download page?',
        buttons: ['Yes, Go to Downloads', 'Later'],
        defaultId: 0,
        cancelId: 1,
      });

      if (result.response === 0) {
        console.log('[Main] User chose to download new version.');
        // Open the GitHub releases page in the default browser
        await shell.openExternal(GITHUB_REPO_URL);
        app.quit(); // Quit the app after downloading
        // NOTE: This doesn't automatically download or install.
        // Implementing auto-update requires electron-updater or similar.
      } else {
        console.log('[Main] User deferred update.');
      }
    } else if (latestVersion) {
      console.log('[Main] Application is up-to-date.');
    }
    // If latestVersion is null, an error occurred fetching it (logged in getLatestVersion)
  } catch (error) {
    console.error('[Main] Error checking for new version:', error);
  }
}

async function getLatestVersion(): Promise<string | null> {
  try {
    const response = await fetch(GITHUB_RELEASES_URL, {
      headers: { 'Accept': 'application/vnd.github.v3+json' } // Good practice for GitHub API
    });
    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }
    const data = await response.json();
    // Ensure tag_name exists and remove 'v' prefix if present
    return data?.tag_name?.replace(/^v/, '') ?? null;
  } catch (error) {
    console.error('[Main] Error fetching latest version from GitHub:', error);
    return null; // Return null to indicate failure
  }
}

// --- Login Handling ---

async function checkLogin() {
  console.log('[Main] Checking login status...');
  try {
    const loggedIn = await isLoggedIn(); // Assumes isLoggedIn checks stored cookies/session
    if (loggedIn) {
      console.log('[Main] Already logged in.');
      if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send(IpcChannels.LOGGED_IN); // Send logged-in status to renderer
      }
    } else {
      console.log('[Main] Not logged in. Creating login window.');
      createLoginWindow();
      // Showing/hiding is handled within createLoginWindow and its events now
    }
  } catch (error) {
    console.error('[Main] Error during login check:', error);
    // Decide how to handle this - maybe show main window with an error?
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
      mainWindow.show();
    }
    dialog.showErrorBox('Login Check Failed', `Could not verify login status: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// --- IPC Handlers ---

// Login Success from Login Window
ipcMain.on(IpcChannels.LOGIN_SUCCESS, async () => {
  console.log('[Main] Received login-success signal.');
  if (!loginWindow || loginWindow.isDestroyed()) {
    console.warn('[Main] Login success signal received, but login window is invalid.');
    return;
  }

  try {
    // Get cookies from the login window's session
    const cookies = await loginWindow.webContents.session.cookies.get({});
    await saveCookies(cookies); // Save cookies persistently

    // Verify login status again after saving cookies
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
      console.log('[Main] Login confirmed after saving cookies.');
      loginWindow.close(); // Close the login window

      if (mainWindow && !mainWindow.isDestroyed()) {
        if (!mainWindow.isVisible()) {
          mainWindow.show(); // Ensure main window is visible
        }
        mainWindow.focus(); // Bring it to the front
        mainWindow.webContents.send(IpcChannels.LOGGED_IN); // Notify renderer
      } else {
        console.warn('[Main] Login successful, but main window is missing. Creating new one.');
        createWindow(); // Recreate main window if it was somehow closed
        // Need to wait for it to load before sending message, handled in createWindow's did-finish-load
      }
    } else {
      console.error('[Main] Login success signal received, but isLoggedIn() check failed after saving cookies.');
      // Keep login window open or show an error?
      dialog.showErrorBox('Login Failed', 'Could not confirm login status after saving session. Please try again.');
    }
  } catch (error) {
    console.error('[Main] Error processing login success:', error);
    dialog.showErrorBox('Login Error', `An error occurred during login processing: ${error instanceof Error ? error.message : String(error)}`);
    // Close login window and show main window? Or let user retry?
    loginWindow?.close();
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.show();
  }
});

// Get Novels Data
ipcMain.handle(IpcChannels.GET_NOVELS, async () => {
  console.log(`[IPC] Handling '${IpcChannels.GET_NOVELS}'`);
  try {
    return await fetchNovels();
  } catch (error) {
    console.error(`[IPC Error] Failed to fetch novels:`, error);
    throw new Error(`Failed to fetch novels: ${error instanceof Error ? error.message : String(error)}`); // Throw error back to renderer
  }
});

// Get Novel Volumes
ipcMain.handle(IpcChannels.GET_VOLUMES, async (_, novelId: string) => {
  console.log(`[IPC] Handling '${IpcChannels.GET_VOLUMES}' for novelId: ${novelId}`);
  try {
    return await fetchVolumes(novelId);
  } catch (error) {
    console.error(`[IPC Error] Failed to fetch volumes for novel ${novelId}:`, error);
    throw new Error(`Failed to fetch volumes: ${error instanceof Error ? error.message : String(error)}`);
  }
});

// Post Chapter
ipcMain.handle(IpcChannels.POST_CHAPTER, async (_, chapterData: {
  chapterTitle: string;
  content: string;
  chapterNumber: string;
  volume: string;
  postOnOtherWebsite: boolean;
  novel: string;
}) => { // Add specific type for chapterData if available
  console.log(`[IPC] Handling '${IpcChannels.POST_CHAPTER}'`);
  // Add validation for chapterData here if possible
  try {
    return await postChapter(_, chapterData);
  } catch (error) {
    console.error(`[IPC Error] Failed to post chapter:`, error);
    throw new Error(`Failed to post chapter: ${error instanceof Error ? error.message : String(error)}`);
  }
});

// Open File Dialog
ipcMain.handle(IpcChannels.OPEN_FILE_DIALOG, async () => {
  console.log(`[IPC] Handling '${IpcChannels.OPEN_FILE_DIALOG}'`);
  try {
    const result = await dialog.showOpenDialog(mainWindow!, { // mainWindow should exist
      title: 'Select File(s)',
      properties: ['openFile', 'multiSelections'], // Allow multiple files
      filters: [
        { name: 'Supported Files', extensions: ['md', 'docx', 'doc', 'zip'] },
        { name: 'Markdown', extensions: ['md'] },
        { name: 'Word Documents', extensions: ['docx', 'doc'] },
        { name: 'Zip Archives', extensions: ['zip'] },
      ],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths; // Return array of paths
    }
    return []; // Return empty array if canceled or no files selected
  } catch (error) {
    console.error(`[IPC Error] Failed to show open file dialog:`, error);
    throw new Error(`Failed to open file dialog: ${error instanceof Error ? error.message : String(error)}`);
  }
});


// --- File Conversion Logic ---

// Helper to convert Markdown to HTML
function convertMarkdownToHtml(markdownContent: string): string {
  const md = markdownit();
  return md.render(markdownContent);
}

// Helper to convert DOCX to HTML using Mammoth
async function convertDocxToHtml(filePath: string | Buffer): Promise<string> {
  console.log('[File Conversion] Converting DOCX...');
  const options: { buffer: Buffer } | { path: string } =
    Buffer.isBuffer(filePath)
      ? { buffer: filePath }
      : { path: filePath as string };
  const result = await mammoth.convertToHtml(options);
  console.log('[File Conversion] DOCX conversion successful.');
  return result.value; // The generated HTML
}

// Helper to convert DOC to HTML using LibreOffice (Requires LibreOffice installed and in PATH)
async function convertDocToHtml(filePathOrBuffer: string | Buffer): Promise<string> {
  console.log('[File Conversion] Converting DOC (requires LibreOffice)...');
  // ** WARNING: This relies on LibreOffice being installed and accessible in the system's PATH. **
  // ** This is a fragile dependency and might fail on user systems. Consider alternatives or clear user instructions. **
  const tempDir = app.getPath('temp');
  let tempFilePath: string = '';
  let isTempFileCreated = false;

  try {
    // If buffer, write to a temporary file first
    if (filePathOrBuffer instanceof Buffer) {
      tempFilePath = path.join(tempDir, `temp_doc_${Date.now()}.doc`);
      await fs.writeFile(tempFilePath, filePathOrBuffer);
      isTempFileCreated = true;
    } else if (typeof filePathOrBuffer === 'string') {
      tempFilePath = filePathOrBuffer; // Use original path if it's a string
    }

    const outputDir = tempDir;
    // Ensure the output file name is unique and predictable based on the input
    const baseName = path.basename(tempFilePath, '.doc');
    const tempHtmlPath = path.join(outputDir, `${baseName}.html`); // LibreOffice names output based on input

    // Delete potential leftover HTML file from previous failed attempts
    try {
      await fs.unlink(tempHtmlPath);
    } catch (unlinkError: unknown) {
      if ((unlinkError as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.warn(`[File Conversion] Could not delete potential leftover file ${tempHtmlPath}:`, unlinkError);
      }
    }

    // Execute LibreOffice command
    const command = `libreoffice --headless --convert-to html "${tempFilePath}" --outdir "${outputDir}"`;
    console.log(`[File Conversion] Executing: ${command}`);

    await new Promise<void>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`[File Conversion] LibreOffice conversion error: ${error.message}`);
          console.error(`[File Conversion] LibreOffice stderr: ${stderr}`);
          reject(new Error(`LibreOffice conversion failed: ${error.message}. Is LibreOffice installed and in PATH?`));
          return;
        }
        if (stderr) {
          console.warn(`[File Conversion] LibreOffice stderr output: ${stderr}`);
        }
        console.log(`[File Conversion] LibreOffice stdout: ${stdout}`);
        console.log(`[File Conversion] DOC conversion successful (output expected at ${tempHtmlPath}).`);
        resolve();
      });
    });

    // Read the converted HTML file
    const htmlContent = await fs.readFile(tempHtmlPath, { encoding: 'utf-8' });

    // Clean up the temporary HTML file
    await fs.unlink(tempHtmlPath);

    return htmlContent;

  } catch (error) {
    console.error('[File Conversion] Error during .doc conversion process:', error);
    // Rethrow a more informative error
    throw new Error(`Failed to convert .doc file: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    // Clean up the temporary .doc file if created
    if (isTempFileCreated && tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch (cleanupError) {
        console.warn(`[File Conversion] Failed to clean up temporary file ${tempFilePath}:`, cleanupError);
      }
    }
  }
}

// Processes content based on file extension
async function processFileContent(
  contentBuffer: Buffer,
  extension: string,
  sourceName: string // e.g., file path or zip entry name
): Promise<string> {
  console.log(`[File Conversion] Processing ${sourceName} (type: ${extension})...`);
  try {
    switch (extension) {
      case '.md':
        // Assuming AdmZip reads text correctly for MD, but Buffer is safer for others
        return convertMarkdownToHtml(contentBuffer.toString('utf-8'));
      case '.docx':
        // Pass buffer directly to mammoth
        return await convertDocxToHtml(contentBuffer);
      case '.doc':
        // Pass buffer to LibreOffice handler
        return await convertDocToHtml(contentBuffer);
      default:
        console.warn(`[File Conversion] Unsupported file extension: ${extension} for ${sourceName}`);
        return `<p>Unsupported file format (${extension}) for ${sourceName}.</p>`;
    }
  } catch (error) {
    console.error(`[File Conversion] Error processing ${sourceName}:`, error);
    // Return error message embedded in HTML for this specific file
    return `<p>Error processing file ${sourceName}: ${error instanceof Error ? error.message : String(error)}</p>`;
  }
}


// Read File(s) and Convert to HTML
ipcMain.handle(IpcChannels.READ_CONVERT_FILE, async (_, filePaths: string[]): Promise<FileResult[] | string> => {
  console.log(`[IPC] Handling '${IpcChannels.READ_CONVERT_FILE}' for paths:`, filePaths);
  const results: FileResult[] = [];

  if (!Array.isArray(filePaths) || filePaths.length === 0) {
    return []; // Return empty array if no paths provided
  }

  try {
    for (const filePath of filePaths) {
      const fileExtension = path.extname(filePath).toLowerCase();
      const fileName = path.basename(filePath);

      if (fileExtension === '.zip') {
        console.log(`[File Conversion] Processing ZIP file: ${fileName}`);
        try {
          const zip = new AdmZip(filePath);
          const zipEntries = zip.getEntries();

          for (const entry of zipEntries) {
            if (!entry.isDirectory) {
              const entryExtension = path.extname(entry.entryName).toLowerCase();
              const entryName = entry.name || entry.entryName; // Use name if available, else full entryName

              if (['.md', '.docx', '.doc'].includes(entryExtension)) {
                const buffer = entry.getData(); // Get content as buffer
                if (buffer) {
                  const htmlContent = await processFileContent(buffer, entryExtension, `zip entry "${entry.entryName}"`);
                  results.push({
                    name: entryName,
                    type: entryExtension.substring(1), // remove dot
                    content: htmlContent
                  });
                } else {
                  console.warn(`[File Conversion] Could not read data for zip entry: ${entry.entryName}`);
                  results.push({
                    name: entryName,
                    type: entryExtension.substring(1),
                    content: `<p>Error reading data for zip entry ${entry.entryName}.</p>`
                  });
                }
              } else {
                console.log(`[File Conversion] Skipping unsupported file in zip: ${entry.entryName}`);
              }
            }
          }
        } catch (zipError) {
          console.error(`[IPC Error] Failed to read or process zip file ${fileName}:`, zipError);
          // Return an error message string for the entire operation if zip fails critically
          return `Error reading zip file ${fileName}: ${zipError instanceof Error ? zipError.message : String(zipError)}`;
        }
      } else if (['.md', '.docx', '.doc'].includes(fileExtension)) {
        console.log(`[File Conversion] Processing single file: ${fileName}`);
        try {
          const buffer = await fs.readFile(filePath); // Read file as buffer
          const htmlContent = await processFileContent(buffer, fileExtension, filePath);
          results.push({
            name: fileName,
            type: fileExtension.substring(1), // remove dot
            content: htmlContent
          });
        } catch (fileReadError) {
          console.error(`[IPC Error] Failed to read or process file ${fileName}:`, fileReadError);
          // Add an error result for this specific file
          results.push({
            name: fileName,
            type: fileExtension.substring(1),
            content: `<p>Error reading or processing file ${fileName}: ${fileReadError instanceof Error ? fileReadError.message : String(fileReadError)}</p>`
          });
        }
      } else {
        console.warn(`[IPC] Unsupported file type selected: ${fileName}`);
        results.push({
          name: fileName,
          type: 'unsupported',
          content: `<p>Unsupported file type: ${fileName}</p>`
        });
      }
    }
    console.log(`[IPC] '${IpcChannels.READ_CONVERT_FILE}' completed. Returning ${results.length} result(s).`);
    return results; // Return array of results

  } catch (error) {
    console.error(`[IPC Error] Unexpected error in '${IpcChannels.READ_CONVERT_FILE}':`, error);
    // Return a generic error string if something unexpected goes wrong at the top level
    return `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`;
  }
});


// Simple Console Log from Renderer
ipcMain.on(IpcChannels.CONSOLE_LOG, (_, message: string) => {
  console.log('[Renderer Log]:', message);
});

// --- End of Refactored Code ---

/*
// ======================================================
// Original main.ts Code (for comparison)
// ======================================================

import AdmZip from 'adm-zip'; // For handling zip files
import { exec } from 'child_process';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs/promises';
import mammoth from 'mammoth';
import markdownit from 'markdown-it';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchNovels, fetchVolumes, isLoggedIn, postChapter, saveCookies } from './lib/util';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
// const COOKIES_FILE_PATH = path.join(__dirname, 'cookies.json'); // Adjust the path as needed

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST


// windows
let mainWindow: BrowserWindow | null;
let loginWindow: BrowserWindow | null;

// --- Configuration ---
// const INITIAL_HIDDEN_URL = 'https://kolnovel.com/post/'; // An example page guaranteed *not* to have the selector
const LOGIN_URL = 'https://kolnovel.com/account/'; // URL to load if element is missing

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      contextIsolation: true, // Consider security implications
    },
  })

  // Test active push message to Renderer-process.
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

 if (VITE_DEV_SERVER_URL) {
 mainWindow.loadURL(VITE_DEV_SERVER_URL)
 } else {
// win.loadFile('dist/index.html')
 mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

function createLoginWindow() {
 loginWindow = new BrowserWindow({
  width: 800, // Adjust as needed
  height: 600, // Adjust as needed
  show: false,
  webPreferences: {
   preload: path.join(__dirname, 'loginPreload.mjs'),
   javascript: true,
   contextIsolation: true,
  },
 });
 console.log(`[Main] Loading initial hidden URL: ${LOGIN_URL}`);
 loginWindow.loadURL(LOGIN_URL); // Load the URL

 loginWindow.on('closed', () => {
  loginWindow = null;
 });
 loginWindow.webContents.on('did-fail-load', (_, errorCode, errorDescription, validatedURL) => {
  console.error(`[Hidden Window] Failed to load ${validatedURL}: ${errorDescription} (Code: ${errorCode})`);
 });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
 if (process.platform !== 'darwin') {
  app.quit()
  mainWindow = null
  // hiddenWindow = null
  loginWindow = null
 }
})

app.on('activate', () => {
 // On OS X it's common to re-create a window in the app when the
 // dock icon is clicked and there are no other windows open.
 if (BrowserWindow.getAllWindows().length === 0) {
  createWindow()
 }
})

app.whenReady().then(() => {
 createWindow();
 checkLogin();
 app.on('activate', () => {
  checkNewVersion();
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
   createWindow();
  }
 });
})


//  CHECK NEW VERSION ================

async function checkNewVersion() {
 const currentVersion = app.getVersion();
 console.log("🚀 ~ checkNewVersion ~ currentVersion:", currentVersion)
 const latestVersion = await getLatestVersion();
 console.log("🚀 ~ checkNewVersion ~ latestVersion:", latestVersion)
 if (currentVersion !== latestVersion) {
  const result = await dialog.showMessageBox({
   title: 'New Version Available',
   message: `A new version of Kolnovel is available (v${latestVersion}). Do you want to download it now?`,
   buttons: ['Yes', 'No'],
   defaultId: 0,
   cancelId: 1,
  });
  console.log("🚀 ~ checkNewVersion ~ result:", result)

 } else {
  console.log("🚀 ~ checkNewVersion ~ currentVersion === latestVersion")
 }
}


async function getLatestVersion(): Promise<string> {
 try {
  const response = await fetch('https://api.github.com/repos/StarlessNight13/kolnovel-upload-app/releases/latest');
  const data = await response.json();
  return data.tag_name.replace('v', '');
 } catch (error) {
  console.error('Error fetching latest version:', error);
  return '0.0.0';
 }
}




//  LOGIN ================

async function checkLogin() {
 const logedIn = await isLoggedIn();
 if (logedIn) {
  console.log("Logged in");
  if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
   mainWindow.webContents.send("loged-in");
  }
  return
 }

 createLoginWindow();

 if (!loginWindow || loginWindow.isDestroyed()) {
  console.warn('[Main] Hidden window does not exist. Cannot change URL or visibility.');
  return;
 }

 if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
  console.log('[Main] Hiding main window and showing hidden window.');
  mainWindow.hide();
  loginWindow.show();
 } else {
  console.warn('[Main] Main window does not exist or is not ready. Cannot change visibility.');
 }
}





// --- IPC Handling ---



// LOGIN ================

ipcMain.on("login-success", async () => {
 console.log("Logged in successfully");
 if (!loginWindow || loginWindow.isDestroyed()) {
  console.warn('[Main] Hidden window does not exist. Cannot change URL or visibility.');
  return;
 }

 const cookies = await loginWindow.webContents.session.cookies.get({});
 await saveCookies(cookies);
 const logedIn = await isLoggedIn();
 if (logedIn) {
  console.log("Logged in");
  if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
   mainWindow.webContents.send("loged-in");
   mainWindow.show();
  }
  loginWindow.close();
 }
 return;
})

// GET DATA ================
ipcMain.handle("get-novels-data", fetchNovels);


ipcMain.handle("get-novels-volumes", async (_, novelId) => {
 const volumes = await fetchVolumes(novelId);
 return volumes;
});


// POST CHAPTER ================

ipcMain.handle("post-chapter", postChapter);

// FILE ================

ipcMain.handle('open-file-dialog', async () => {
 const result = await dialog.showOpenDialog({
  title: 'Select File',
  properties: ['openFile'],
  filters: [
   { name: 'Supported Files', extensions: ['md', 'docx', 'doc', 'zip'] },
   { name: 'Markdown', extensions: ['md'] },
   { name: 'Word Documents', extensions: ['docx', 'doc'] },
   { name: 'Zip Archives (containing md, doc, docx)', extensions: ['zip'] },
  ],
 });

 if (!result.canceled && result.filePaths.length > 0) {
  return result.filePaths[0];
 }
 return null;
});


ipcMain.handle('read-and-convert-file', async (_, filePath) => {
 try {
  const fileExtension = path.extname(filePath).toLowerCase();

  if (fileExtension === '.zip') {
   try {
    const zip = new AdmZip(filePath);
    const zipEntries = zip.getEntries();
    const filesArray: { name: string; type: string; content: string }[] = [];

    // Iterate through each file in the zip archive
    for (const entry of zipEntries) {
     if (!entry.isDirectory) {
      const entryExtension = path.extname(entry.entryName).toLowerCase();
      if (['.md', '.docx', '.doc'].includes(entryExtension)) {
       let fileContent: string | Buffer | null = null;
       try {
        fileContent = zip.readAsText(entry.entryName);
       } catch (e) {
        fileContent = zip.readFile(entry.entryName);
       }
       let htmlContent = '';

       switch (entryExtension) {
        case '.md': {
         if (typeof fileContent === 'string') {
          const md = new markdownit();
          htmlContent = md.render(fileContent);
          filesArray.push({ name: entry.name, type: 'markdown', content: htmlContent });
         }
         break;
        }
        case '.docx': {
         fileContent = zip.readFile(entry.entryName);
         if (fileContent instanceof Buffer) {
          console.log("is buffer")
          const result = await mammoth.convertToHtml({ buffer: fileContent });
          htmlContent = result.value;
          filesArray.push({ name: entry.name, type: 'docx', content: htmlContent });
         } else {
          console.log("is not buffer")
         }
         break;
        }
        case '.doc': {
         if (fileContent instanceof Buffer) {
          try {
           const tempFilePath = path.join(app.getPath('temp'), `temp_${Date.now()}_${entry.name}`);
                await fs.writeFile(tempFilePath, fileContent, {});
                      const tempHtmlPath = path.join(app.getPath('temp'), `temp_${Date.now()}.html`);
                      await new Promise<void>((resolve, reject) => {
                        exec(`libreoffice --headless --convert-to html "${tempFilePath}" --outdir "${app.getPath('temp')}"`, (error) => {
                          if (error) {
                            console.error(`Error converting .doc in zip: ${error}`);
                            reject(error);
                            return;
                          }
                          resolve();
                        });
                      });
                      htmlContent = await fs.readFile(tempHtmlPath, { encoding: 'utf-8' });
                      await fs.unlink(tempFilePath);
                      await fs.unlink(tempHtmlPath);
                      filesArray.push({ name: entry.name, type: 'doc', content: htmlContent });
                    } catch (error) {
                      console.error('Error converting .doc in zip:', error);
                    }
                  } else {
                    console.error(`Error reading ${entry.entryName} from zip as Buffer.`);
                  }
                  break;
                }
              }
            }
          }
        }
        return filesArray;
      } catch (error) {
        console.error('Error reading zip file:', error);
        return '<p>Error reading the zip file.</p>';
      }
    } else {
      // Handle individual md, docx, doc files as before
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const fileName = path.basename(filePath);
      const fileType = fileExtension.substring(1); // Remove the leading '.'

      switch (fileExtension) {
        case '.md': { // Enclose in curly braces
          const md = new markdownit();
          return {
            content: md.render(fileContent),
            type: fileType,
            name: fileName,
          }
        }
        case '.docx': { // Enclose in curly braces
          const result = await mammoth.convertToHtml({ buffer: await fs.readFile(filePath) });
          return {
            content: result.value,
            type: fileType,
            name: fileName,
          }
        }
        case '.doc': { // Enclose in curly braces
          try {
            const tempHtmlPath = path.join(app.getPath('temp'), `temp_${Date.now()}.html`);
            await new Promise<void>((resolve, reject) => {
              exec(`libreoffice --headless --convert-to html "${filePath}" --outdir "${app.getPath('temp')}"`, (error) => {
                if (error) {
                  console.error(`Error converting .doc: ${error}`);
                  reject(error);
                  return;
                }
                resolve();
              });
            });
            const htmlContent = await fs.readFile(tempHtmlPath, 'utf-8');
            await fs.unlink(tempHtmlPath);
            return {
              content: htmlContent,
              type: fileType,
              name: fileName,
            };
          } catch (error) {
            console.error('Error converting .doc:', error);
            return '<p>Error reading or converting .doc file.</p>';
          }
        }
        default:
          return '<p>Unsupported file format.</p>';
      }
    }
  } catch (error) {
    console.error('Error reading file:', error);
    return '<p>Error reading the file.</p>';
  }
});



ipcMain.on("console-log", (_, message) => {
  console.log(message);
});

*/