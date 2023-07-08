import { ipcRenderer } from 'electron';
import fs from 'fs';
import { PathChecker } from './PathChecker';
import * as FileMethods from './FileMethods';

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

	files.forEach(async (fileName, i) => {
		const Type = await PathChecker(`${DirectoryPath}/${fileName}`);
		const filePath = `${DirectoryPath}/${fileName}`;
		const stats = fs.statSync(filePath);

		let FT = FileMethods.getFileType(filePath);
		let Sym = FileMethods.isSymLink(filePath);
		let AT = FileMethods.getFileLastAccessTime(filePath);
		let CT = FileMethods.getFileCreationTime(filePath);
		let MT = FileMethods.getFileModifiedTime(filePath);
		let OwnerAndGroup = FileMethods.getFileOwnerAndGroup(filePath);
		let permissions = FileMethods.getFilePermissions(filePath);
		let accessPermissions = FileMethods.getFileAccessPermissions(filePath);
		let size = FileMethods.getFileSize(filePath);

		if (i == 0 || i == 1) {
			console.log('Name:', fileName);
			console.log('Size:', stats.size);
			console.log('Modified:', stats.mtime);
			console.log('Type:', Type);

			console.log('getFileType:', FT);
			console.log('isSymLink:', Sym);
			console.log('AT:', AT);
			console.log('CT:', CT);
			console.log('MT:', MT);
			console.log('OwnerAndGroup:', OwnerAndGroup);
			console.log('permissions:', permissions);
			console.log('accessPermissions:', accessPermissions);
			console.log('size:', size);

			console.log(' ');
		}

		fileDetails.push({
			name: fileName,
			size: stats.size,
			modifiedAt: stats.mtime,
			type: Type,
		});
	});

	return fileDetails;
};
