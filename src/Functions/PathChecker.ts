import { ipcRenderer } from 'electron';
import fs from 'fs';

export const PathChecker = (path: string): Promise<string | boolean> =>
	new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			console.log = (...args) => {
				ipcRenderer.send('console-log', 'log', ...args);
			};

			if (err) {
				reject(err);
				return;
			}

			if (stats.isFile()) {
				// console.log(`File: ${path}`);
				resolve('file');
			} else if (stats.isDirectory()) {
				// console.log(`Directory: ${path}`);

				resolve('directory');
			} else {
				// console.log(`Hit Other: ${path} `);

				resolve(false);
			}
		});
	});
