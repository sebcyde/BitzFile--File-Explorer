import { ipcRenderer } from 'electron';
import fs from 'fs';
import { PathChecker } from './PathChecker';

interface FileDetails {
	name: string;
	size: number;
	modifiedAt: Date;
	type: string | boolean;
}

export const GetDirectoryData = (DirectoryPath: string): FileDetails[] => {
	console.log = (...args) => {
		ipcRenderer.send('console-log', 'log', ...args);
	};

	const files = fs.readdirSync(DirectoryPath);
	const fileDetails: FileDetails[] = [];
	console.log(' ');

	files.forEach(async (fileName) => {
		const Type = await PathChecker(`${DirectoryPath}/${fileName}`);
		const filePath = `${DirectoryPath}/${fileName}`;
		const stats = fs.statSync(filePath);

		console.log('Name:', fileName);
		console.log('Size:', stats.size);
		console.log('Modified:', stats.mtime);
		console.log('Type:', Type);

		console.log(' ');

		fileDetails.push({
			name: fileName,
			size: stats.size,
			modifiedAt: stats.mtime,
			type: Type,
		});
	});

	return fileDetails;
};
