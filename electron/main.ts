import AdmZip from 'adm-zip'; // For handling zip files
import { exec } from 'child_process';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs/promises';
import mammoth from 'mammoth';
import markdownit from 'markdown-it';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST


// windows
let mainWindow: BrowserWindow | null;
let hiddenWindow: BrowserWindow | null;

// --- Configuration ---
const INITIAL_HIDDEN_URL = 'https://kolnovel.com/post/'; // An example page guaranteed *not* to have the selector
const ALTERNATIVE_HIDDEN_URL = 'https://kolnovel.com/account/'; // URL to load if element is missing

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

function createHiddenWindow() {
  hiddenWindow = new BrowserWindow({
    width: 800, // Adjust as needed
    height: 600, // Adjust as needed
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'hiddenPreload.mjs'),
      javascript: true,
      contextIsolation: true,
    },
  });
  console.log(`[Main] Loading initial hidden URL: ${INITIAL_HIDDEN_URL}`);
  hiddenWindow.loadURL(INITIAL_HIDDEN_URL); // Load the URL

  hiddenWindow.on('closed', () => {
    hiddenWindow = null;
  });
  // Optional: Handle load failures
  hiddenWindow.webContents.on('did-fail-load', (_, errorCode, errorDescription, validatedURL) => {
    console.error(`[Hidden Window] Failed to load ${validatedURL}: ${errorDescription} (Code: ${errorCode})`);
    // Optionally notify the main window or retry
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    mainWindow = null
    hiddenWindow = null
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
  createHiddenWindow();
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      // Optionally re-create hidden window if needed
      if (!hiddenWindow) {
        createHiddenWindow();
      }
    }
  });
})



// --- IPC Handling ---


// Listen for the notification from the hidden window's preload script
ipcMain.on('form-missing', (_, selector) => {
  console.log(`[Main] Received notification: Element '${selector}' is missing in hidden window.`);

  if (!hiddenWindow || hiddenWindow.isDestroyed()) {
    console.warn('[Main] Hidden window does not exist. Cannot change URL or visibility.');
    return;
  }

  console.log(`[Main] Loading URL in hidden window: ${ALTERNATIVE_HIDDEN_URL}`);
  hiddenWindow.loadURL(ALTERNATIVE_HIDDEN_URL);

  if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
    console.log('[Main] Hiding main window and showing hidden window.');
    mainWindow.hide();
    hiddenWindow.show();
  } else {
    console.warn('[Main] Main window does not exist or is not ready. Cannot change visibility.');
  }
});

ipcMain.on('login-success', () => {
  console.log(`[Main] Received notification: Login successful.`);

  if (!hiddenWindow || hiddenWindow.isDestroyed()) {
    console.warn('[Main] Hidden window does not exist. Cannot change URL or visibility.');
    return;
  }

  console.log(`[Main] Loading URL in hidden window: ${INITIAL_HIDDEN_URL}`);
  hiddenWindow.loadURL(INITIAL_HIDDEN_URL);

  if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
    console.log('[Main] Hiding hidden window and showing main window.');
    hiddenWindow.hide();
    mainWindow.show();
    mainWindow.webContents.send("loged-in");
  } else {
    console.warn('[Main] Main window does not exist or is not ready. Cannot change visibility.');
  }
});


ipcMain.on('loged-in', () => {
  if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("loged-in");
  } else {
    console.warn('[Main] Main window does not exist or is not ready. Cannot change visibility.');
  }
});

ipcMain.on("novels-data-hidden", (_, novels) => {
  if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("novels-data", novels);
  } else {
    console.warn('[Main] Main window does not exist or is not ready. Cannot change visibility.');
  }
});


ipcMain.on("novel-selected", (_, value: string) => {
  if (hiddenWindow && hiddenWindow.webContents && !hiddenWindow.isDestroyed()) {
    hiddenWindow.webContents.send("novel-selected", value);
  } else {
    console.warn('[Main] Main window does not exist or is not ready. Cannot change visibility.');
  }
});

ipcMain.on("novels-volumes-hidden", (_, volumes) => {
  if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("novels-volumes", volumes);
  } else {
    console.warn('[Main] Main window does not exist or is not ready. Cannot change visibility.');
  }
});



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







//  process one data item ================
ipcMain.on('process-data', async (_, dataFromTab1) => {
  console.log('Main process received data from Tab 1:', dataFromTab1);

  if (hiddenWindow && mainWindow && !hiddenWindow.isDestroyed() && !mainWindow.isDestroyed()) {
    // Send the data to Tab 2 and wait for its response
    hiddenWindow?.webContents.send('process-data-request', dataFromTab1);

  } else {
    return { status: 'error', error: 'Tab 2 window not available.' };
  }
});


ipcMain.on('data-processed-response', (_: unknown, response: unknown) => {
  console.log('Main process received response from Tab 2:', response);
  if (mainWindow && mainWindow.webContents && !mainWindow.isDestroyed()) {
    // Send the response back to Tab 1
    console.log('Sending response to Tab 1:', response);
    mainWindow.webContents.send('data-processed-response', response);
  }
})


//  process data sequentially ================
//  this is a bit hacky, but it works
interface ChapterData {
  id: string;
  content: string;
  chapterNumber: string;
  chapterTitle: string;
  postOnOtherWebsite: boolean;
}

ipcMain.on('process-data-array', async (_, dataArray: ChapterData[]) => {
  console.log('Received data array in main process:', dataArray);
  await processDataSequentially(dataArray);
});


async function processDataItem(item: ChapterData) {
  return new Promise((resolve, reject) => {
    const hiddenTab = new BrowserWindow({
      width: 800,
      height: 600,
      show: false, // Make it hidden
      webPreferences: {
        preload: path.join(__dirname, 'postPreload.mjs'),
        nodeIntegration: true,
        contextIsolation: false, // Consider security implications for hidden tabs too
      },
    });
    hiddenTab.loadURL(INITIAL_HIDDEN_URL); // Load the URL

    hiddenTab.webContents.on('did-finish-load', () => {
      // Send data to the hidden tab's renderer
      hiddenTab.webContents.send('process-item', item);
      mainWindow?.webContents.send('tab-prossesing', { id: item.id });
      // Listen for a response from the hidden tab
      ipcMain.once(`response-from-tab-${item.id}`, (_, responseData) => {
        console.log(`Received response from tab ${item.id}:`, responseData);
        hiddenTab.close(); // Close the hidden tab after processing
        resolve({ id: item.id, result: responseData }); // Resolve with the result
      });
    });


    // Optional: Handle errors during loading
    hiddenTab.webContents.on('did-fail-load', (_, errorCode, errorDescription, validatedURL) => {
      console.error(`Failed to load ${validatedURL}: ${errorDescription} (Error Code: ${errorCode})`);
      hiddenTab.close();
      reject(new Error(`Failed to load ${validatedURL}: ${errorDescription}`));
    });
  });
}

async function processDataSequentially(dataArray: ChapterData[]) {
  for (const item of dataArray) {
    try {
      const result = await processDataItem(item);
      mainWindow?.webContents.send('tab-processed', result); // Send the result back to the main window
    } catch (error) {
      console.error(`Error processing item ${item.id}:`, error);
      mainWindow?.webContents.send('tab-processed', { id: item.id, error: error });
    }
  }
  console.log('All items processed.');
  // Optionally, notify the main window that all processing is complete
  mainWindow?.webContents.send('processing-complete');
}
