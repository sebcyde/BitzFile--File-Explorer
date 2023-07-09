import { ipcRenderer } from 'electron';
import fs from 'fs';
import { PathChecker } from './PathChecker';
import * as FileMethods from './FileMethods';
import { FileObject } from '../Types';

export const GetDirectoryData = async (
	DirectoryPath: string
): Promise<FileObject[]> => {
	console.log = (...args) => {
		ipcRenderer.send('console-log', 'log', ...args);
	};

	const files = fs.readdirSync(DirectoryPath);
	const fileDetails: FileObject[] = [];

	for (const fileName of files) {
		if (FileMethods.isSymLink(`${DirectoryPath}/${fileName}`)) continue;

		const Type = await PathChecker(`${DirectoryPath}/${fileName}`);
		const filePath = `${DirectoryPath}/${fileName}`;

		// console.log('GDD - Data:', fileName);

		let FileData: FileObject = {
			name: fileName,
			FileType: FileMethods.getFileType(filePath),
			SymLink: FileMethods.isSymLink(filePath),
			AccessTime: FileMethods.getFileLastAccessTime(filePath),
			CreationTime: FileMethods.getFileCreationTime(filePath),
			ModifiedTime: FileMethods.getFileModifiedTime(filePath),
			Permissions: FileMethods.getFilePermissions(filePath),
			AccessPermissions: FileMethods.getFileAccessPermissions(filePath),
			Size: FileMethods.getFileSize(filePath),
			Type,
			Location: `${DirectoryPath}/${fileName}`,
		};

		fileDetails.push(FileData);
	}

	// console.log('GDD - Data:', fileDetails);

	return fileDetails;
};

export const countDirectories = (array: FileObject[]): number => {
	return array.reduce((count, obj) => {
		if (obj.Type === 'directory') {
			return count + 1;
		} else {
			return count;
		}
	}, 0);
};

export const countFiles = (array: FileObject[]): number => {
	return array.reduce((count, obj) => {
		if (obj.Type === 'file') {
			return count + 1;
		} else {
			return count;
		}
	}, 0);
};
