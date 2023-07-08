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

	// console.log('Append Path:', path);

	if (path[path.length - 1] !== '\\') {
		DirectoryName = `\\${DirectoryName}`;
	}

	let FileType = await PathChecker(`${path}${DirectoryName}`);
	console.log(FileType);

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

	// console.log('Append Path:', path);

	if (path[path.length - 1] !== '\\') {
		DirectoryName = `\\${DirectoryName}`;
	}
	console.log(`FP: ${path}${DirectoryName}`);

	let FileType = await PathChecker(`${path}${DirectoryName}`);
	console.log('Future Path Type:', FileType);

	if (!FileType) {
		return;
	} else {
		store.dispatch(setFuturePath(`${path}${DirectoryName}`));
	}
};
