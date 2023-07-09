import { ipcRenderer } from 'electron';
import fs from 'fs';

export const PathChecker = async (path: string): Promise<string | boolean> => {
	return new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			console.log = (...args) => {
				ipcRenderer.send('console-log', 'log', ...args);
			};

			if (err) {
				console.log(`Path Checker Error: ${err}`);
				resolve(false);
				return;
			}

			if (stats.isFile()) {
				// console.log(`Path Checker FILE - ${path}`);
				resolve('file');
			} else if (stats.isDirectory()) {
				// console.log(`Path Checker DIRECTORY - ${path}`);
				resolve('directory');
			} else {
				// console.log(`Path Checker OTHER - ${path}`);
				resolve(false);
			}
			// console.log(' ');
		});
	});
};
