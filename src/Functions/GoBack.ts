import { store } from '../Store/store';
import { setCurrentPath } from '../Store/Path';
import { ipcRenderer } from 'electron';

export const GoBack = () => {
	const storeState = store.getState();
	const CP = storeState.PathState.path;

	const lastSlashIndex = CP.lastIndexOf('\\');

	console.log = (...args) => {
		ipcRenderer.send('console-log', 'log', ...args);
	};

	if (lastSlashIndex === -1) {
		// No slashes found, return the original directory
		store.dispatch(setCurrentPath('C:\\Users\\SebCy\\Downloads'));
	} else {
		let NP = CP.slice(0, lastSlashIndex + 1);
		NP = NP.slice(0, NP.length - 1);
		console.log('Back CP:', CP);

		console.log('Back NP:', NP);

		store.dispatch(setCurrentPath(NP));
	}
};
