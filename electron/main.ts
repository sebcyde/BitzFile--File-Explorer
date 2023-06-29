import { app, BrowserWindow } from 'electron';
import path from 'node:path';

let splashWindow: Electron.BrowserWindow | null = null;
let mainWindow: Electron.BrowserWindow | null = null;

process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged
	? process.env.DIST
	: path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
	splashWindow = new BrowserWindow({
		icon: path.join(process.env.PUBLIC, 'logo.png'),
		width: 800,
		height: 600,
		frame: false,
		transparent: false,
		autoHideMenuBar: true,
		center: true,
		fullscreenable: false,
		maximizable: false,
		resizable: false,
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	splashWindow.loadFile('splash.html');

	splashWindow.webContents.on('dom-ready', () => {
		if (splashWindow) {
			setTimeout(() => {
				if (splashWindow) {
					mainWindow = new BrowserWindow({
						icon: path.join(process.env.PUBLIC, 'logo.png'),
						width: 800,
						height: 600,
						transparent: false,
						autoHideMenuBar: true,
						center: true,
						fullscreenable: false,
						maximizable: false,
						resizable: false,
						webPreferences: {
							nodeIntegration: true,
							contextIsolation: false,
						},
					});

					splashWindow!.close();
					splashWindow = null;
					mainWindow.loadFile('/index.html');

					// Test active push message to Renderer-process.
					mainWindow.webContents.on('did-finish-load', () => {
						mainWindow?.webContents.send(
							'main-process-message',
							new Date().toLocaleString()
						);
					});

					if (VITE_DEV_SERVER_URL) {
						mainWindow.loadURL(VITE_DEV_SERVER_URL);
					} else {
						// mainWindow.loadFile('dist/index.html')
						mainWindow.loadFile(path.join(process.env.DIST, 'index.html'));
					}
				}
			}, 3000);
		}
	});
}

app.on('window-all-closed', () => {
	win = null;
});

app.whenReady().then(createWindow);
