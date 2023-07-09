import { RootState, store } from '../Store/store';
import { setFuturePath, setCurrentPath } from '../Store/Path';
import { ipcRenderer } from 'electron';
import { PathChecker } from './PathChecker';

export const AppendPath = async (DirectoryName: string) => {
	const storeState = store.getState();
	const path = storeState.PathState.path;
	console.log = (...args) => {
		ipcRenderer.send('console-log', 'log', ...args);
	};

	// console.log('Append Path - Path:', path);

	if (path[path.length - 1] !== '\\') {
		DirectoryName = `\\${DirectoryName}`;
	}

	// console.log(`Append Path - Sent to PathChecker: ${path}${DirectoryName}`);

	let FileType = await PathChecker(`${path}${DirectoryName}`);
	// console.log('Append Path - File Type:', FileType);

	// console.log(' ');

	if (!FileType) {
		return;
	} else if (FileType == 'directory') {
		store.dispatch(setCurrentPath(`${path}${DirectoryName}`));
	}
};

export const AppendFuturePath = async (DirectoryName: string) => {
	const storeState = store.getState();
	const path = storeState.PathState.path;

	console.log = (...args) => {
		ipcRenderer.send('console-log', 'log', ...args);
	};

	// console.log('Append Future Path:', path);
	// console.log('Appending Future:', DirectoryName);

	if (path[path.length - 1] !== '\\') {
		DirectoryName = `\\${DirectoryName}`;
	}
	// console.log(`Append Future Path FP: ${path}${DirectoryName}`);

	let FileType = await PathChecker(`${path}${DirectoryName}`);
	// console.log('Append Future Path - FP Type:', FileType);

	console.log(' ');

	if (!FileType) {
		return;
	} else {
		store.dispatch(setFuturePath(`${path}${DirectoryName}`));
	}
};
