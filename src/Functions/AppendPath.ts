import { RootState, store } from '../Store/store';
import { setCurrentPath } from '../Store/Path';
import { ipcRenderer } from 'electron';

export const AppendPath = (DirectoryName: string) => {
	const storeState = store.getState();
	const path = storeState.PathState.path;
	console.log = (...args) => {
		ipcRenderer.send('console-log', 'log', ...args);
	};

	console.log('Append Path:', path);
	console.log('Append Path + 1:', path[path.length - 1]);

	if (path[path.length - 1] !== '\\') {
		DirectoryName = `\\${DirectoryName}`;
	}
	store.dispatch(setCurrentPath(`${path}${DirectoryName}`));
};
